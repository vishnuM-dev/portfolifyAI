import { IExperience } from "../../../types/portfolio";

export function buildExperiencePrompt(
  experience: IExperience,
  experienceIndex: number,
  candidateSkills: string[] = []
): string {
  const source = {
    experienceIndex,
    position: experience.position,
    company: experience.company,
    location: experience.location,
    startDate: experience.startDate,
    endDate: experience.endDate,
    currentDescription: experience.description || "",
    currentAchievements: experience.achievements || [],
    verifiedSkills: candidateSkills,
  };

  return `
TASK: Enhance and polish the professional description and bullet points for this specific role.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Begin bullet points with strong action verbs (e.g. "Architected", "Engineered", "Implemented", "Streamlined").
2. Clarify technical responsibilities while strictly preserving factual scope.
3. If no quantitative metrics were provided in the source, DO NOT invent numbers or percentages.
4. Improve clarity, impact, and grammatical flow.

OUTPUT FORMAT (JSON only):
{
  "experienceIndex": ${experienceIndex},
  "company": string,
  "position": string,
  "originalDescription": string,
  "suggestedDescription": string,
  "suggestedAchievements": string[],
  "improvementReason": string
}
`;
}
