import { IPortfolio } from "../../../types/portfolio";

export function buildResumeAnalysisPrompt(portfolio: IPortfolio, rawResumeText?: string): string {
  const sourcePayload = {
    profile: {
      name: portfolio.profile?.name || "",
      headline: portfolio.profile?.headline || "",
      professionalSummary: portfolio.profile?.professionalSummary || "",
      email: portfolio.profile?.email || "",
      location: portfolio.profile?.location || "",
    },
    skills: portfolio.skills || [],
    experience: (portfolio.experience || []).map((exp, idx) => ({
      index: idx,
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      achievements: exp.achievements || [],
    })),
    education: (portfolio.education || []).map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate,
      endDate: edu.endDate,
    })),
    projects: (portfolio.projects || []).map((proj, idx) => ({
      index: idx,
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies || [],
    })),
    certifications: (portfolio.certifications || []).map((c) => ({
      name: c.name,
      issuer: c.issuer,
      issueDate: c.issueDate,
    })),
    rawResumeDocument: rawResumeText || portfolio.resume?.rawText || "",
  };

  return `
TASK: Perform a comprehensive, holistic career intelligence analysis of the provided user portfolio and resume.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(sourcePayload, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Craft a high-impact headline tailored strictly to the user's documented tech stack and roles.
2. Formulate a recruiter-ready professional summary reflecting their verified seniority level.
3. Categorize all documented skills into logical groups (technical, frameworks, tools, databases, cloud, softSkills). Do NOT introduce tools not in the source.
4. For each experience record, improve the clarity and active verb phrasing without inventing metrics.
5. For each project, improve the description and highlight verified technical capabilities.
6. Provide ATS-optimized SEO metadata (metaTitle, metaDescription, keywords).
7. If any entry lacks measurable impact, add a constructive warning in "warnings" array.

OUTPUT FORMAT:
Respond with a single JSON object matching this exact schema:
{
  "headline": {
    "current": string,
    "suggested": string,
    "reasoning": string
  },
  "summary": {
    "length": "medium",
    "current": string,
    "suggested": string,
    "highlights": string[]
  },
  "skills": {
    "technical": string[],
    "frameworks": string[],
    "tools": string[],
    "databases": string[],
    "cloud": string[],
    "softSkills": string[],
    "duplicateOrRedundant": string[],
    "recommendedOrder": string[]
  },
  "experienceSuggestions": [
    {
      "experienceIndex": number,
      "company": string,
      "position": string,
      "originalDescription": string,
      "suggestedDescription": string,
      "suggestedAchievements": string[],
      "improvementReason": string
    }
  ],
  "projectSuggestions": [
    {
      "projectIndex": number,
      "title": string,
      "originalDescription": string,
      "suggestedDescription": string,
      "suggestedHighlights": string[],
      "suggestedTechnologies": string[],
      "improvementReason": string
    }
  ],
  "seo": {
    "metaTitle": string,
    "metaDescription": string,
    "keywords": string[],
    "suggestedSlug": string
  },
  "warnings": string[],
  "detectedSeniority": string
}
`;
}
