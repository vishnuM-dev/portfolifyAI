import { IProject } from "../../../types/portfolio";

export function buildProjectPrompt(
  project: IProject,
  projectIndex: number,
  candidateSkills: string[] = []
): string {
  const source = {
    projectIndex,
    title: project.title,
    currentDescription: project.description || "",
    currentTechnologies: project.technologies || [],
    verifiedCandidateSkills: candidateSkills,
  };

  return `
TASK: Enhance the presentation, clarity, and architectural highlights of this portfolio project.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Explain what problem the project solves, its architectural design, and core engineering value.
2. List 2-3 key technical highlights.
3. Suggest technologies ONLY from verified candidate stack or existing project technologies.
4. Do NOT claim unsupported third-party integrations or fake metrics.

OUTPUT FORMAT (JSON only):
{
  "projectIndex": ${projectIndex},
  "title": string,
  "originalDescription": string,
  "suggestedDescription": string,
  "suggestedHighlights": string[],
  "suggestedTechnologies": string[],
  "improvementReason": string
}
`;
}
