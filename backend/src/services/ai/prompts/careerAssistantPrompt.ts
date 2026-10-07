import { IPortfolio } from "../../../types/portfolio";

export function buildCareerAssistantPrompt(portfolio: IPortfolio, targetRole?: string): string {
  const sourcePayload = {
    targetRoleGoal: targetRole || "Highest growth role matching documented background",
    profile: {
      name: portfolio.profile?.name || "",
      headline: portfolio.profile?.headline || "",
      professionalSummary: portfolio.profile?.professionalSummary || "",
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
      responsibilities: exp.responsibilities || [],
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
    })),
    education: (portfolio.education || []).map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
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
    })),
    customSections: (portfolio.customSections || []).map((item) => ({
      title: item.title,
      category: item.category,
      description: item.description,
    })),
  };

  return `
TASK: Act as an elite AI Career Advisor and Talent Strategist. Perform an explainable, in-depth career and portfolio readiness audit based strictly on documented evidence.

<<<USER_DOCUMENTED_PORTFOLIO_DATA>>>
${JSON.stringify(sourcePayload, null, 2)}
<<<END_USER_DOCUMENTED_PORTFOLIO_DATA>>>

INSTRUCTIONS:
1. Career Profile:
   - Identify candidate category (e.g. Frontend, Backend, Full Stack, DevOps, Cloud Architect, AI/ML).
   - Detect documented seniority (e.g. Junior, Mid-Level, Senior, Staff/Principal, Lead).
   - List key strengths and recommended target roles supported by their evidence.
2. Career Scores (0-100):
   - Calculate portfolioQualityScore, profileCompletenessScore, and recruiterReadinessScore.
   - Provide a detailed "scoreBreakdown" array with { criterion, score, maxScore, explanation } explaining the exact reasoning behind each score.
3. Skill Gap Analysis:
   - Current skills from portfolio.
   - Missing skills commonly expected for their target seniority.
   - Recommended skills and high/medium/low learning priorities with clear rationales.
4. Portfolio Advisor Advice:
   - Provide actionable advice items with { area, suggestion, rationale, impact } explaining WHY (e.g. "Strong project depth but experience description lacks metrics...").
5. Action Plan:
   - Step-by-step sequential action items for immediate recruiter readiness.

CRITICAL ANTI-HALLUCINATION RULE:
Do not fabricate nonexistent companies, dates, degrees, or certifications. Base all scores and gap analysis solely on verified facts.

OUTPUT FORMAT:
Respond with a single JSON object matching this exact schema:
{
  "careerProfile": {
    "category": "string",
    "seniority": "string",
    "strengths": ["string"],
    "targetRoleRecommendations": ["string"]
  },
  "careerScore": {
    "portfolioQualityScore": number,
    "profileCompletenessScore": number,
    "recruiterReadinessScore": number,
    "scoreBreakdown": [
      {
        "criterion": "string",
        "score": number,
        "maxScore": number,
        "explanation": "string"
      }
    ],
    "strengths": ["string"],
    "weaknesses": ["string"]
  },
  "skillGap": {
    "currentSkills": ["string"],
    "missingSkills": ["string"],
    "recommendedSkills": ["string"],
    "targetRoles": ["string"],
    "learningPriorities": [
      {
        "skill": "string",
        "priority": "high" | "medium" | "low",
        "rationale": "string"
      }
    ]
  },
  "portfolioAdvisorAdvice": [
    {
      "area": "string",
      "suggestion": "string",
      "rationale": "string",
      "impact": "string"
    }
  ],
  "actionPlan": ["string"]
}
`;
}
