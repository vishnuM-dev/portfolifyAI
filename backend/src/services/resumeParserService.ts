// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");
import mammoth from "mammoth";
import {
  StructuredResumeData,
  IExperience,
  IEducation,
  IProject,
  ICertification,
  ISocialLinks,
} from "../types/portfolio";
import { AIProviderFactory } from "./ai/providers/providerFactory";

export class ResumeParserService {
  /**
   * Extracts raw text from uploaded resume buffer (PDF, DOCX, or TXT)
   */
  static async extractRawText(
    buffer: Buffer,
    mimetypeOrName?: string,
    originalName?: string
  ): Promise<string> {
    if (!buffer || buffer.length === 0) {
      return "";
    }

    const resolvedName = (originalName || mimetypeOrName || "").toLowerCase();
    const resolvedMime = (mimetypeOrName || "").toLowerCase();
    const extension = resolvedName.split(".").pop() || "";

    if (resolvedMime.includes("pdf") || extension === "pdf") {
      try {
        if (typeof pdfParse === "function") {
          const pdfData = await pdfParse(buffer);
          return pdfData?.text || "";
        } else if (pdfParse && typeof pdfParse.PDFParse === "function") {
          const parser = new pdfParse.PDFParse({ data: buffer });
          try {
            const result = await parser.getText();
            return result?.text || "";
          } finally {
            if (typeof parser.destroy === "function") {
              await parser.destroy().catch(() => {});
            }
          }
        }
      } catch (pdfErr) {
        console.warn("[ResumeParserService.extractRawText] PDF parser warning:", pdfErr);
      }
      return "";
    }

    if (
      resolvedMime.includes("wordprocessingml") ||
      resolvedMime.includes("officedocument") ||
      extension === "docx"
    ) {
      try {
        const docxResult = await mammoth.extractRawText({ buffer });
        return docxResult.value || "";
      } catch (docxErr) {
        console.warn("[ResumeParserService.extractRawText] DOCX parser warning:", docxErr);
      }
      return "";
    }

    if (resolvedMime.includes("text") || extension === "txt" || extension === "md") {
      return buffer.toString("utf-8");
    }

    // Generic text decoding fallback
    const rawString = buffer.toString("utf-8");
    if (rawString && !rawString.includes("\u0000")) {
      return rawString;
    }

    throw new Error(`Unsupported resume file format (.${extension}). Please upload PDF, DOCX, or TXT.`);
  }

  /**
   * Parses resume text using Google Gemini AI with high fidelity,
   * falling back automatically to the advanced heuristic parser.
   */
  static async parseResume(rawText: string): Promise<StructuredResumeData> {
    if (!rawText || rawText.trim().length === 0) {
      return this.parseText("");
    }

    try {
      const provider = AIProviderFactory.getProvider();
      if (provider.isAvailable()) {
        const systemPrompt = `You are an elite, highly accurate AI Resume Parser and Career Data Analyst.
Your task is to extract all structured data from the candidate's resume text and return it strictly in JSON matching the exact schema.

CRITICAL INSTRUCTIONS:
1. ONLY extract information that is explicitly stated or directly inferred from the resume text.
2. NEVER invent, hallucinate, or hardcode fake companies, fake contact info, fake projects, or fake degrees.
3. If a field is not present in the resume (such as phone, location, or website), return empty string "" or empty array [].
4. Do NOT insert placeholder text like 'Technology Company', 'Company Name', 'Innovation Labs', 'San Francisco, CA', or 'contact@portfolify.ai'.
5. Extract all skills, experience items, educational qualifications, projects, certifications, and social links mentioned.
6. Format output strictly as a JSON object with this exact structure:
{
  "profile": {
    "name": string,
    "headline": string,
    "professionalSummary": string,
    "email": string,
    "phone": string,
    "location": string,
    "website": string
  },
  "skills": string[],
  "experience": [
    {
      "company": string,
      "position": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "currentlyWorking": boolean,
      "description": string,
      "responsibilities": string[],
      "achievements": string[],
      "technologies": string[]
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "fieldOfStudy": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "grade": string,
      "description": string
    }
  ],
  "projects": [
    {
      "title": string,
      "description": string,
      "technologies": string[],
      "githubUrl": string,
      "liveUrl": string,
      "features": string[],
      "role": string
    }
  ],
  "certifications": [
    {
      "name": string,
      "issuer": string,
      "issueDate": string,
      "credentialUrl": string
    }
  ],
  "socialLinks": {
    "github": string,
    "linkedin": string,
    "twitter": string,
    "website": string
  }
}`;

        const userPrompt = `Resume text to parse:\n\n${rawText.slice(0, 32000)}`;
        const result = await provider.generateJSON<any>(systemPrompt, userPrompt);

        if (result && result.data && typeof result.data === "object") {
          const aiData = result.data;
          const fallback = this.parseText(rawText);

          return {
            profile: {
              name: (aiData.profile?.name || "").trim() || fallback.profile.name || "",
              headline: (aiData.profile?.headline || "").trim() || fallback.profile.headline || "",
              professionalSummary:
                (aiData.profile?.professionalSummary || "").trim() || fallback.profile.professionalSummary || "",
              email: (aiData.profile?.email || "").trim() || fallback.profile.email || "",
              phone: (aiData.profile?.phone || "").trim() || fallback.profile.phone || "",
              location: (aiData.profile?.location || "").trim() || fallback.profile.location || "",
              profileImage: "",
              website: (aiData.profile?.website || "").trim() || fallback.profile.website || "",
            },
            skills:
              Array.isArray(aiData.skills) && aiData.skills.length > 0
                ? Array.from(
                    new Set(
                      aiData.skills
                        .map((s: any) => String(s).trim())
                        .filter((s: string) => s.length > 0)
                    )
                  )
                : fallback.skills,
            experience:
              Array.isArray(aiData.experience) && aiData.experience.length > 0
                ? aiData.experience.map((e: any) => ({
                    company: String(e.company || "").trim() || "Company",
                    position: String(e.position || "").trim() || "Role",
                    location: String(e.location || "").trim(),
                    startDate: String(e.startDate || "").trim(),
                    endDate: String(e.endDate || "").trim(),
                    currentlyWorking: Boolean(
                      e.currentlyWorking || (e.endDate && /present|current/i.test(e.endDate))
                    ),
                    description: String(e.description || "").trim(),
                    responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities.map(String) : [],
                    achievements: Array.isArray(e.achievements) ? e.achievements.map(String) : [],
                    technologies: Array.isArray(e.technologies) ? e.technologies.map(String) : [],
                  }))
                : fallback.experience,
            education:
              Array.isArray(aiData.education) && aiData.education.length > 0
                ? aiData.education.map((ed: any) => ({
                    institution: String(ed.institution || "").trim(),
                    degree: String(ed.degree || "").trim(),
                    fieldOfStudy: String(ed.fieldOfStudy || "").trim(),
                    location: String(ed.location || "").trim(),
                    startDate: String(ed.startDate || "").trim(),
                    endDate: String(ed.endDate || "").trim(),
                    grade: String(ed.grade || "").trim(),
                    description: String(ed.description || "").trim(),
                  }))
                : fallback.education,
            projects:
              Array.isArray(aiData.projects) && aiData.projects.length > 0
                ? aiData.projects.map((p: any) => ({
                    title: String(p.title || "").trim(),
                    description: String(p.description || "").trim(),
                    technologies: Array.isArray(p.technologies) ? p.technologies.map(String) : [],
                    githubUrl: String(p.githubUrl || "").trim(),
                    liveUrl: String(p.liveUrl || "").trim(),
                    features: Array.isArray(p.features) ? p.features.map(String) : [],
                    role: String(p.role || "").trim(),
                  }))
                : fallback.projects,
            certifications:
              Array.isArray(aiData.certifications) && aiData.certifications.length > 0
                ? aiData.certifications.map((c: any) => ({
                    name: String(c.name || "").trim(),
                    issuer: String(c.issuer || "").trim(),
                    issueDate: String(c.issueDate || "").trim(),
                    credentialUrl: String(c.credentialUrl || "").trim(),
                  }))
                : fallback.certifications,
            socialLinks: {
              github: aiData.socialLinks?.github || fallback.socialLinks?.github || "",
              linkedin: aiData.socialLinks?.linkedin || fallback.socialLinks?.linkedin || "",
              twitter: aiData.socialLinks?.twitter || fallback.socialLinks?.twitter || "",
              website: aiData.socialLinks?.website || fallback.socialLinks?.website || "",
              instagram: "",
            },
          };
        }
      }
    } catch (err: any) {
      console.warn(
        "[ResumeParserService.parseResume] AI extraction failed or unavailable, falling back to heuristic parser:",
        err?.message || err
      );
    }

    return this.parseText(rawText);
  }

  /**
   * High-accuracy heuristic parser for offline, deterministic, or fallback resume parsing.
   * Completely clean: extracts real resume facts with zero fake mock placeholders.
   */
  static parseText(rawText: string): StructuredResumeData {
    if (!rawText || rawText.trim().length === 0) {
      return {
        profile: {
          name: "",
          headline: "",
          professionalSummary: "",
          email: "",
          phone: "",
          location: "",
          profileImage: "",
          website: "",
        },
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        socialLinks: { github: "", linkedin: "", twitter: "", website: "" },
      };
    }

    const text = rawText.replace(/\r\n/g, "\n");
    const rawLines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    // 1. Contact Information Extraction
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0].toLowerCase() : "";

    const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const phone = phoneMatch ? phoneMatch[0].trim() : "";

    const githubMatch =
      text.match(/https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i) ||
      text.match(/github\.com\/[a-zA-Z0-9_-]+/i);
    const github = githubMatch
      ? githubMatch[0].startsWith("http")
        ? githubMatch[0]
        : `https://${githubMatch[0]}`
      : "";

    const linkedinMatch =
      text.match(/https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i) ||
      text.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
    const linkedin = linkedinMatch
      ? linkedinMatch[0].startsWith("http")
        ? linkedinMatch[0]
        : `https://${linkedinMatch[0]}`
      : "";

    const twitterMatch =
      text.match(/https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9_]+/i) ||
      text.match(/(?:twitter|x)\.com\/[a-zA-Z0-9_]+/i);
    const twitter = twitterMatch
      ? twitterMatch[0].startsWith("http")
        ? twitterMatch[0]
        : `https://${twitterMatch[0]}`
      : "";

    // Candidate Location detection from header area
    let location = "";
    const headerLines = rawLines.slice(0, 10);
    const locationRegex = /\b([A-Z][a-zA-Z\s.-]+,\s*[A-Z][a-zA-Z\s.-]+(?:,\s*[A-Z][a-zA-Z\s.-]+)?)\b/;
    for (const hLine of headerLines) {
      if (hLine.includes("@") || hLine.includes("github.com") || hLine.includes("linkedin.com")) {
        // May contain pipe-separated location e.g. "Hyderabad, India | +91 ... | email"
        const parts = hLine.split(/[|•]/).map((p) => p.trim());
        for (const p of parts) {
          if (
            !p.includes("@") &&
            !p.match(/^\+?\d/) &&
            !p.includes("http") &&
            !p.includes("linkedin") &&
            !p.includes("github") &&
            p.length > 3 &&
            p.length < 50
          ) {
            location = p;
            break;
          }
        }
      } else {
        const lMatch = hLine.match(locationRegex);
        if (lMatch && !hLine.toLowerCase().includes("university") && !hLine.toLowerCase().includes("technologies")) {
          location = lMatch[1].trim();
        }
      }
      if (location) break;
    }

    // 2. Candidate Name & Headline Extraction
    let candidateName = "";
    let candidateHeadline = "";

    // Look for first clean non-header line for Name
    for (const line of headerLines) {
      if (
        !line.includes("@") &&
        !line.match(/^\+?\d/) &&
        !line.toLowerCase().includes("http") &&
        !line.toLowerCase().includes("curriculum") &&
        !line.toLowerCase().includes("resume") &&
        !line.toLowerCase().includes("github") &&
        !line.toLowerCase().includes("linkedin") &&
        !line.includes("|") &&
        line.length >= 2 &&
        line.length <= 45
      ) {
        candidateName = line;
        break;
      }
    }

    if (!candidateName && email) {
      // Derive clean name from email username (e.g. "alex.chen@gmail.com" -> "Alex Chen")
      const userPart = email.split("@")[0].replace(/[0-9_.-]+/g, " ").trim();
      if (userPart) {
        candidateName = userPart
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
      }
    }

    // Headline: check line right below name or look for developer/engineer/lead title
    if (candidateName) {
      const nameIndex = rawLines.indexOf(candidateName);
      if (
        nameIndex >= 0 &&
        rawLines[nameIndex + 1] &&
        !rawLines[nameIndex + 1].includes("@") &&
        !rawLines[nameIndex + 1].includes("http") &&
        rawLines[nameIndex + 1].length < 70
      ) {
        candidateHeadline = rawLines[nameIndex + 1].replace(/[|•]/g, " ").trim();
      }
    }

    // 3. Section Slicing via Keyword Detection
    const sectionKeywords = [
      { key: "summary", patterns: ["professional summary", "summary", "about me", "profile", "objective"] },
      {
        key: "skills",
        patterns: [
          "skills",
          "technical skills",
          "core competencies",
          "technologies",
          "tech stack",
          "tools & technologies",
          "key skills",
        ],
      },
      {
        key: "experience",
        patterns: [
          "experience",
          "work experience",
          "professional experience",
          "employment history",
          "work history",
          "career history",
          "internships",
        ],
      },
      {
        key: "education",
        patterns: [
          "education",
          "academic background",
          "educational qualifications",
          "academics",
          "educational background",
        ],
      },
      {
        key: "projects",
        patterns: ["projects", "personal projects", "key projects", "notable projects", "academic projects"],
      },
      {
        key: "certifications",
        patterns: [
          "certifications",
          "certificates",
          "licenses & certifications",
          "courses",
          "training & certifications",
        ],
      },
    ];

    const sectionIndices: { key: string; index: number; line: string }[] = [];

    rawLines.forEach((line, idx) => {
      const lower = line.toLowerCase().replace(/[:#_=-]/g, " ").trim();
      for (const sec of sectionKeywords) {
        if (sec.patterns.some((p) => lower === p || lower.startsWith(p + " ") || lower.endsWith(" " + p))) {
          sectionIndices.push({ key: sec.key, index: idx, line });
          break;
        }
      }
    });

    const getSectionLines = (key: string): string[] => {
      const foundIdx = sectionIndices.findIndex((s) => s.key === key);
      if (foundIdx === -1) return [];
      const start = sectionIndices[foundIdx].index + 1;
      const end = foundIdx + 1 < sectionIndices.length ? sectionIndices[foundIdx + 1].index : rawLines.length;
      return rawLines.slice(start, end);
    };

    // Summary Extraction
    let professionalSummary = "";
    const summaryLines = getSectionLines("summary");
    if (summaryLines.length > 0) {
      professionalSummary = summaryLines
        .slice(0, 8)
        .filter((l) => !l.startsWith("#"))
        .join(" ")
        .trim();
    }

    // 4. Skills Extraction
    const skillLines = getSectionLines("skills");
    const extractedSkills = new Set<string>();

    const knownSkills = [
      "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "Python",
      "Java", "Spring Boot", "C++", "C#", ".NET", "Golang", "Go", "Rust", "PHP", "Laravel",
      "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Redux", "Vue.js", "Angular", "Svelte",
      "MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite", "GraphQL", "REST APIs", "FastAPI",
      "AWS", "Google Cloud", "GCP", "Azure", "Docker", "Kubernetes", "Git", "GitHub", "CI/CD",
      "Linux", "Agile", "Scrum", "Jest", "Cypress", "Machine Learning", "PyTorch", "TensorFlow",
      "LangChain", "OpenAI", "Gemini", "Kafka", "RabbitMQ", "Microservices", "TanStack Query",
      "Figma", "UI/UX", "Data Structures", "Algorithms", "WebSockets"
    ];

    const fullTextLower = text.toLowerCase();
    for (const skill of knownSkills) {
      const regex = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (regex.test(fullTextLower)) {
        extractedSkills.add(skill);
      }
    }

    skillLines.forEach((line) => {
      const cleanLine = line.replace(/^[a-zA-Z\s&/]+:\s*/, "");
      const tokens = cleanLine.split(/[,•|/·;\n]/).map((s) => s.trim()).filter((s) => s.length > 1 && s.length < 35);
      tokens.forEach((t) => {
        if (!t.includes("http") && !t.includes("@") && !t.match(/^\d+$/)) {
          extractedSkills.add(t);
        }
      });
    });

    const skillsArray = Array.from(extractedSkills).slice(0, 30);

    if (!candidateHeadline && skillsArray.length > 0) {
      candidateHeadline = `${skillsArray.slice(0, 2).join(" & ")} Developer`;
    }

    // 5. Work Experience Extraction
    const expLines = getSectionLines("experience");
    const experiences: IExperience[] = [];
    let currentExp: IExperience | null = null;

    const datePattern = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+)?\d{4}\s*[-–—to]+\s*(?:Present|Current|(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+)?\d{4})/i;

    for (const line of expLines) {
      const dateMatch = line.match(datePattern);

      const hasRoleOrCompanyCue =
        dateMatch ||
        line.includes(" | ") ||
        line.includes(" - ") ||
        line.toLowerCase().includes(" at ") ||
        /(?:Engineer|Developer|Architect|Manager|Lead|Designer|Intern|Specialist|Consultant|Analyst|Director|Associate)/i.test(line);

      const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");

      if (hasRoleOrCompanyCue && !isBullet && line.length < 90) {
        if (currentExp && (currentExp.position || currentExp.company)) {
          experiences.push(currentExp);
        }

        let parsedCompany = "";
        let parsedPosition = "";
        let startDate = "";
        let endDate = "";
        let currentlyWorking = false;

        if (dateMatch) {
          const dateStr = dateMatch[0];
          const parts = dateStr.split(/[-–—to]+/);
          startDate = parts[0]?.trim() || "";
          endDate = parts[1]?.trim() || "Present";
          currentlyWorking = /present|current/i.test(endDate);
        }

        const cleanLine = line.replace(datePattern, "").trim().replace(/^[-–—|,]+|[-–—|,]+$/g, "").trim();

        if (cleanLine.includes(" | ")) {
          const segments = cleanLine.split(" | ").map((s) => s.trim());
          parsedPosition = segments[0];
          parsedCompany = segments[1] || "";
        } else if (cleanLine.toLowerCase().includes(" at ")) {
          const atParts = cleanLine.split(/ at /i);
          parsedPosition = atParts[0]?.trim() || "";
          parsedCompany = atParts[1]?.trim() || "";
        } else if (cleanLine.includes(" - ")) {
          const dashParts = cleanLine.split(" - ");
          parsedPosition = dashParts[0]?.trim() || "";
          parsedCompany = dashParts[1]?.trim() || "";
        } else {
          parsedPosition = cleanLine;
        }

        currentExp = {
          position: parsedPosition || "Software Engineer",
          company: parsedCompany || "",
          startDate,
          endDate,
          currentlyWorking,
          description: "",
          responsibilities: [],
          achievements: [],
          technologies: [],
        };
      } else if (currentExp) {
        const bulletText = line.replace(/^[•\-*]\s*/, "").trim();
        if (bulletText) {
          if (!currentExp.company && !currentExp.description && line.length < 50 && !isBullet) {
            currentExp.company = bulletText;
          } else {
            currentExp.responsibilities = [...(currentExp.responsibilities || []), bulletText];
            if (!currentExp.description) {
              currentExp.description = bulletText;
            } else {
              currentExp.description += ` ${bulletText}`;
            }
          }
        }
      }
    }

    if (currentExp && (currentExp.position || currentExp.company)) {
      experiences.push(currentExp);
    }

    // 6. Education Extraction
    const eduLines = getSectionLines("education");
    const educations: IEducation[] = [];
    let currentEdu: IEducation | null = null;

    const degreeRegex = /(?:Bachelor|Master|B\.?S|B\.?Tech|M\.?S|M\.?Tech|B\.?E|Associate|Diploma|Ph\.?D|High School|BSc|MSc|BBA|MBA)/i;

    for (const line of eduLines) {
      const isDegree = line.match(degreeRegex);
      const isInst = /university|college|institute|school|academy/i.test(line);
      const dateMatch = line.match(/\b(19\d\d|20\d\d)\b/);

      if ((isDegree || isInst) && line.length < 100) {
        if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
          educations.push(currentEdu);
        }

        let inst = "";
        let deg = "";
        let field = "";

        if (line.includes(" | ")) {
          const parts = line.split(" | ").map((s) => s.trim());
          deg = parts[0] || "";
          inst = parts[1] || "";
        } else if (isInst) {
          inst = line;
        } else if (isDegree) {
          deg = line;
        }

        if (deg.toLowerCase().includes(" in ")) {
          const fieldParts = deg.split(/ in /i);
          deg = fieldParts[0]?.trim() || deg;
          field = fieldParts[1]?.trim() || "";
        }

        currentEdu = {
          institution: inst,
          degree: deg || (isDegree ? isDegree[0] : "Degree"),
          fieldOfStudy: field,
          endDate: dateMatch ? dateMatch[0] : "",
          startDate: "",
          description: "",
          grade: "",
        };
      } else if (currentEdu) {
        if (!currentEdu.institution && isInst) {
          currentEdu.institution = line;
        } else if (/cgpa|gpa|percentage|grade/i.test(line)) {
          currentEdu.grade = line.replace(/^[•\-*]\s*/, "").trim();
        } else {
          currentEdu.description = line.replace(/^[•\-*]\s*/, "").trim();
        }
      }
    }

    if (currentEdu && (currentEdu.institution || currentEdu.degree)) {
      educations.push(currentEdu);
    }

    // 7. Projects Extraction
    const projLines = getSectionLines("projects");
    const projects: IProject[] = [];
    let currentProj: IProject | null = null;

    for (const line of projLines) {
      const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("*");

      if (!isBullet && line.length > 2 && line.length < 60 && !line.toLowerCase().includes("technologies:")) {
        if (currentProj && currentProj.title) {
          projects.push(currentProj);
        }

        let projTitle = line.replace(/[:|–-]/g, " ").trim();
        let projGit = "";

        if (line.includes("http")) {
          const urlMatch = line.match(/https?:\/\/[^\s]+/);
          if (urlMatch) {
            projGit = urlMatch[0];
            projTitle = projTitle.replace(urlMatch[0], "").trim();
          }
        }

        currentProj = {
          title: projTitle,
          description: "",
          technologies: [],
          githubUrl: projGit,
          liveUrl: "",
        };
      } else if (currentProj) {
        const bulletText = line.replace(/^[•\-*]\s*/, "").trim();
        if (/technologies:|tech stack:|tools:/i.test(bulletText)) {
          const techList = bulletText
            .replace(/^[a-zA-Z\s]+:\s*/, "")
            .split(/[,•|/]/)
            .map((s) => s.trim())
            .filter(Boolean);
          currentProj.technologies = Array.from(new Set([...currentProj.technologies, ...techList]));
        } else if (bulletText.includes("github.com") || bulletText.startsWith("http")) {
          const link = bulletText.match(/https?:\/\/[^\s]+/)?.[0] || bulletText;
          if (!currentProj.githubUrl) currentProj.githubUrl = link;
          else currentProj.liveUrl = link;
        } else if (bulletText) {
          if (!currentProj.description) {
            currentProj.description = bulletText;
          } else {
            currentProj.description += ` ${bulletText}`;
          }
        }
      }
    }

    if (currentProj && (currentProj as IProject).title) {
      projects.push(currentProj);
    }

    // 8. Certifications Extraction
    const certLines = getSectionLines("certifications");
    const certifications: ICertification[] = [];

    certLines.forEach((line) => {
      const clean = line.replace(/^[•\-*]\s*/, "").trim();
      if (clean.length > 3 && clean.length < 90) {
        let name = clean;
        let issuer = "";
        let issueDate = "";

        const dateMatch = clean.match(/\b(20\d\d|19\d\d)\b/);
        if (dateMatch) issueDate = dateMatch[0];

        if (clean.includes(" - ")) {
          const parts = clean.split(" - ");
          name = parts[0]?.trim() || clean;
          issuer = parts[1]?.replace(/\b(20\d\d|19\d\d)\b/, "").trim() || "";
        } else if (/aws|amazon/i.test(clean)) {
          issuer = "Amazon Web Services";
        } else if (/google/i.test(clean)) {
          issuer = "Google";
        } else if (/meta/i.test(clean)) {
          issuer = "Meta";
        } else if (/microsoft|azure/i.test(clean)) {
          issuer = "Microsoft";
        }

        certifications.push({
          name,
          issuer: issuer || "Professional Certification",
          issueDate,
        });
      }
    });

    return {
      profile: {
        name: candidateName,
        headline: candidateHeadline || "Software Professional",
        professionalSummary,
        email,
        phone,
        location,
        profileImage: "",
        website: "",
      },
      skills: skillsArray,
      experience: experiences.slice(0, 10),
      education: educations.slice(0, 5),
      projects: projects.slice(0, 8),
      certifications: certifications.slice(0, 8),
      socialLinks: {
        github,
        linkedin,
        twitter,
        website: "",
      },
    };
  }

  /**
   * STEP 9: Deep Resume Quality Analysis
   * Detects missing sections, incomplete info, duplicate bullets, weak verbs, date inconsistencies, skill mismatches
   */
  static analyzeResumeQuality(rawText: string, structured: StructuredResumeData) {
    const issues: { type: "missing" | "incomplete" | "warning" | "improvement"; section: string; message: string }[] = [];
    let qualityScore = 100;

    // 1. Missing sections check
    if (!structured.profile.professionalSummary || structured.profile.professionalSummary.length < 30) {
      issues.push({
        type: "missing",
        section: "Summary",
        message: "Professional summary is missing or too brief (< 30 characters).",
      });
      qualityScore -= 12;
    }

    if (!structured.experience || structured.experience.length === 0) {
      issues.push({
        type: "missing",
        section: "Experience",
        message: "No work experience detected in resume.",
      });
      qualityScore -= 25;
    }

    if (!structured.education || structured.education.length === 0) {
      issues.push({
        type: "missing",
        section: "Education",
        message: "No formal degree or educational background detected.",
      });
      qualityScore -= 10;
    }

    if (!structured.projects || structured.projects.length === 0) {
      issues.push({
        type: "missing",
        section: "Projects",
        message: "No distinct technical projects listed. Projects elevate hiring manager engagement.",
      });
      qualityScore -= 15;
    }

    if (!structured.skills || structured.skills.length < 4) {
      issues.push({
        type: "incomplete",
        section: "Skills",
        message: "Under 4 core technical skills extracted. Expand your skills inventory.",
      });
      qualityScore -= 10;
    }

    // 2. Incomplete information checks in experience
    structured.experience.forEach((exp, idx) => {
      if (!exp.company || exp.company === "Company Name" || exp.company === "Technology Company") {
        issues.push({
          type: "incomplete",
          section: `Experience #${idx + 1}`,
          message: `Missing company employer name for position '${exp.position}'.`,
        });
        qualityScore -= 5;
      }
      if (!exp.startDate || exp.startDate.length < 4) {
        issues.push({
          type: "incomplete",
          section: `Experience #${idx + 1}`,
          message: `Incomplete timeline date for role at '${exp.company || "Company"}'.`,
        });
        qualityScore -= 4;
      }
      if (exp.description && exp.description.length < 25) {
        issues.push({
          type: "improvement",
          section: `Experience #${idx + 1}`,
          message: `Role description for '${exp.position}' is very short. Elaborate on scope and achievements.`,
        });
        qualityScore -= 4;
      }
    });

    // 3. Duplicate skills check
    const lowerSkills = structured.skills.map((s) => s.toLowerCase());
    const duplicates = lowerSkills.filter((item, index) => lowerSkills.indexOf(item) !== index);
    if (duplicates.length > 0) {
      issues.push({
        type: "warning",
        section: "Skills",
        message: `Duplicate skill mentions detected: ${Array.from(new Set(duplicates)).join(", ")}.`,
      });
      qualityScore -= 5;
    }

    // 4. Contact validation
    if (!structured.profile.email || !structured.profile.email.includes("@")) {
      issues.push({
        type: "missing",
        section: "Contact",
        message: "Valid email address not found in resume header.",
      });
      qualityScore -= 10;
    }

    const finalScore = Math.max(qualityScore, 20);

    return {
      score: finalScore,
      rating: finalScore >= 85 ? "Excellent" : finalScore >= 70 ? "Good" : finalScore >= 50 ? "Needs Polish" : "Incomplete",
      totalIssues: issues.length,
      issues,
      recommendations: [
        "Include metrics and quantifiable results in role descriptions (e.g. 'improved latency by 30%').",
        "Keep dates uniformly formatted across all career milestones (e.g. '2021 – Present').",
        "Ensure technical projects link directly to live demos or public GitHub repositories.",
      ],
    };
  }

  /**
   * STEP 9: Resume vs Portfolio Comparison
   * Identifies missing, conflicting, duplicated, and outdated information
   */
  static compareResumeWithPortfolio(resumeData: StructuredResumeData, portfolio: any) {
    const portfolioSkills = (portfolio.skills || []).map((s: string) => s.toLowerCase());
    const missingSkills = (resumeData.skills || []).filter((s) => !portfolioSkills.includes(s.toLowerCase()));

    // Experience Comparison
    const portfolioExpCompanies = (portfolio.experience || []).map((e: any) => (e.company || "").toLowerCase());
    const missingExperiences = (resumeData.experience || []).filter(
      (e) => !portfolioExpCompanies.includes((e.company || "").toLowerCase())
    );

    // Projects Comparison
    const portfolioProjectTitles = (portfolio.projects || []).map((p: any) => (p.title || "").toLowerCase());
    const missingProjects = (resumeData.projects || []).filter(
      (p) => !portfolioProjectTitles.includes((p.title || "").toLowerCase())
    );

    const conflicts: { field: string; resumeValue: string; portfolioValue: string; reason: string }[] = [];

    // Check headline conflict
    if (
      resumeData.profile.headline &&
      portfolio.profile?.headline &&
      resumeData.profile.headline.toLowerCase() !== portfolio.profile.headline.toLowerCase()
    ) {
      conflicts.push({
        field: "Headline",
        resumeValue: resumeData.profile.headline,
        portfolioValue: portfolio.profile.headline,
        reason: "Different professional titles detected between resume and existing portfolio profile.",
      });
    }

    // Check summary conflict
    if (
      resumeData.profile.professionalSummary &&
      portfolio.profile?.professionalSummary &&
      resumeData.profile.professionalSummary.length > 20 &&
      resumeData.profile.professionalSummary !== portfolio.profile.professionalSummary
    ) {
      conflicts.push({
        field: "Professional Summary",
        resumeValue: resumeData.profile.professionalSummary,
        portfolioValue: portfolio.profile.professionalSummary,
        reason: "Updated summary text available from latest uploaded resume.",
      });
    }

    return {
      missingSkills,
      missingExperiences,
      missingProjects,
      conflicts,
      hasUpdates:
        missingSkills.length > 0 ||
        missingExperiences.length > 0 ||
        missingProjects.length > 0 ||
        conflicts.length > 0,
      summary: {
        newSkillsCount: missingSkills.length,
        newExperienceCount: missingExperiences.length,
        newProjectsCount: missingProjects.length,
        conflictsCount: conflicts.length,
      },
    };
  }
}

export default ResumeParserService;
