import { IPortfolio } from "../../../types/portfolio";

export function buildHeadlinePrompt(portfolio: IPortfolio): string {
  const source = {
    currentHeadline: portfolio.profile?.headline || "",
    currentName: portfolio.profile?.name || "",
    skills: portfolio.skills || [],
    recentRoles: (portfolio.experience || []).slice(0, 3).map((e) => ({
      position: e.position,
      company: e.company,
    })),
  };

  return `
TASK: Generate a professional, modern, high-impact headline for this candidate based ONLY on verified source skills and roles.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Include primary role title and top 3-4 key technologies present in the source.
2. Maintain professional, concise formatting (e.g. "Senior Full Stack Engineer | React | Node.js | TypeScript").
3. Do NOT mention technologies not present in the user's data.

OUTPUT FORMAT (JSON only):
{
  "current": string,
  "suggested": string,
  "reasoning": string
}
`;
}
