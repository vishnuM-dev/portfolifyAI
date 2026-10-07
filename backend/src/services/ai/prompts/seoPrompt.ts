import { IPortfolio } from "../../../types/portfolio";

export function buildSeoPrompt(portfolio: IPortfolio): string {
  const source = {
    name: portfolio.profile?.name || "",
    headline: portfolio.profile?.headline || "",
    skills: portfolio.skills || [],
    location: portfolio.profile?.location || "",
    currentSlug: portfolio.slug || "",
  };

  return `
TASK: Generate organic, professional SEO metadata and keywords for the candidate's public portfolio.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Generate an attractive meta title (< 60 chars) including candidate name and primary specialization.
2. Generate a compelling meta description (< 155 chars) summarizing core skills and location.
3. List 8-12 high-intent search keywords based strictly on their verified tech stack.
4. Suggest a clean, lowercase URL slug if beneficial.

OUTPUT FORMAT (JSON only):
{
  "metaTitle": string,
  "metaDescription": string,
  "keywords": string[],
  "suggestedSlug": string
}
`;
}
