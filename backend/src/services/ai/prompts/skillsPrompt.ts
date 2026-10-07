export function buildSkillsPrompt(skills: string[], contextHeadline: string = ""): string {
  const source = {
    skills,
    contextHeadline,
  };

  return `
TASK: Categorize, clean, group, and deduplicate the candidate's existing technical skills.

<<<USER_SUPPLIED_SOURCE_DATA>>>
${JSON.stringify(source, null, 2)}
<<<END_USER_SUPPLIED_SOURCE_DATA>>>

INSTRUCTIONS:
1. Categorize skills into:
   - technical (languages, core paradigms)
   - frameworks (libraries, web frameworks)
   - tools (IDEs, build systems, dev tools)
   - databases (SQL, NoSQL, ORMs)
   - cloud (DevOps, containerization, cloud infra)
   - softSkills (leadership, collaboration, agile)
2. Identify duplicate or redundant entries (e.g. "JS" vs "JavaScript", "React.js" vs "React").
3. Recommend optimal display ordering with highest-priority skills first.
4. DO NOT add skills that are absent from the provided source.

OUTPUT FORMAT (JSON only):
{
  "technical": string[],
  "frameworks": string[],
  "tools": string[],
  "databases": string[],
  "cloud": string[],
  "softSkills": string[],
  "duplicateOrRedundant": string[],
  "recommendedOrder": string[]
}
`;
}
