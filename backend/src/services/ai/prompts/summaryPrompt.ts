import { IPortfolio } from "../../../types/portfolio";

export function buildSummaryPrompt(
  portfolio: IPortfolio,
  length: "short" | "medium" | "detailed" = "medium"
): string {
  const source = {
    lengthRequested: length,
    currentSummary: portfolio.profile?.professionalSummary || "",
    headline: portfolio.profile?.headline || "",
    skills: portfolio.skills || [],
    experience: (portfolio.experience || []).map((e) => ({
      position: e.position,
      company: e.company,
      description: e.description,
      achievements: e.achievements || [],
    })),
    education: portfolio.education || [],
  };

  const targetLengthGuidance =
    length === "short"
      ? "2 concise, punchy sentences (approx 35-50 words)."
      : length === "detailed"
      ? "3-4 structured paragraphs highlighting core specialization, methodologies, and technical stack (approx 120-180 words)."
      : "1-2 polished paragraphs delivering maximum recruiter impact (approx 65-100 words).";

  return `
TASK: Generate an ATS-friendly, professional career summary of length '${length}'.

Target Length: ${targetLengthGuidance}

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Ground every statement strictly in the candidate's verified skills and work experience.
2. Use active, confident tone avoiding buzzword fluff.
3. Do not invent metrics or companies not listed above.

OUTPUT FORMAT (JSON only):
{
  "length": "${length}",
  "current": string,
  "suggested": string,
  "highlights": string[]
}
`;
}
