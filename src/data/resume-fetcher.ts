import { DATA, type ResumeData } from "@/data/resume";

const PUBLISHED_RESUME_URL = DATA.contact.resumeUrl;

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>|<\/div>|<\/tr>|<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

function section(text: string, heading: string, nextHeadings: string[]) {
  const start = text.indexOf(heading);
  if (start < 0) return "";

  const content = text.slice(start + heading.length);
  const end = nextHeadings
    .map((nextHeading) => content.indexOf(nextHeading))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  return content.slice(0, end ?? content.length).trim();
}

function bullets(text: string) {
  return text
    .split("•")
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function formatTechnologyName(name: string) {
  const groupedTechnology = name.match(/^(.+?)\s*\(([^()]+)\)$/);
  if (!groupedTechnology) return [name];

  const [, provider, technologies] = groupedTechnology;
  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean)
    .map((technology) => `${provider.trim()} - ${technology}`);
}

function splitTechnologyNames(value: string) {
  const names: string[] = [];
  let start = 0;
  let parenthesesDepth = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === "(") parenthesesDepth += 1;
    if (value[index] === ")") parenthesesDepth = Math.max(0, parenthesesDepth - 1);
    if (value[index] === "," && parenthesesDepth === 0) {
      names.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }

  names.push(value.slice(start).trim());
  return names.filter(Boolean);
}

function formatTechnologyNames(names: readonly string[]) {
  return names.flatMap(formatTechnologyName);
}

function formatResumeTechnologies(data: ResumeData): ResumeData {
  const formatted = {
    ...data,
    skills: Object.fromEntries(
      Object.entries(data.skills).map(([category, skills]) => [
        category,
        formatTechnologyNames(skills.map((skill) => skill.name)).map((name) => ({ name })),
      ]),
    ),
    work: data.work.map((work) => ({
      ...work,
      badges: work.badges ? formatTechnologyNames(work.badges) : work.badges,
    })),
    projects: data.projects.map((project) => ({
      ...project,
      technologies: formatTechnologyNames(project.technologies),
    })),
  };

  return formatted as unknown as ResumeData;
}

function parsePublishedResume(html: string): ResumeData {
  const text = htmlToText(html);
  const parsed = {
    ...DATA,
    skills: { ...DATA.skills },
    work: DATA.work.map((work) => ({ ...work, description: [...work.description] })),
    education: DATA.education.map((education) => ({ ...education })),
    projects: DATA.projects.map((project) => ({
      ...project,
      technologies: [...project.technologies],
      links: [...project.links],
    })),
    achievements: DATA.achievements.map((achievement) => ({
      ...achievement,
      links: [...achievement.links],
    })),
  } as unknown as ResumeData;
  const skillsText = section(text, "Skills", ["Experience"]);
  const educationText = section(text, "Education", ["Projects"]);
  const projectsText = section(text, "Projects", ["Certifications", "Achievements"]);
  const achievementsText = section(text, "Achievements", []);

  const skills: Record<string, readonly { name: string }[]> = { ...parsed.skills };
  for (const item of skillsText.split("•").map((value) => value.trim()).filter(Boolean)) {
    const separator = item.indexOf(":");
    if (separator < 0) continue;
    const category = item.slice(0, separator).trim();
    const values = splitTechnologyNames(item.slice(separator + 1))
      .flatMap(formatTechnologyName)
      .map((name) => ({ name }));
    if (values.length > 0) skills[category] = values;
  }
  (parsed as unknown as { skills: typeof skills }).skills = skills;

  const educationDates = educationText.match(/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{4}/);
  if (educationDates && parsed.education[0]) {
    const [start, end] = educationDates[0].split("-").map((value) => value.trim().slice(-4));
    const education = parsed.education[0] as unknown as { start: string; end: string };
    education.start = start;
    education.end = end;
  }

  const achievementBulletStart = achievementsText.indexOf("•");
  const achievementBullets = bullets(
    achievementBulletStart >= 0
      ? achievementsText.slice(achievementBulletStart)
      : achievementsText,
  );
  if (achievementBullets.length > 0) {
    (parsed as unknown as { achievements: unknown[] }).achievements = achievementBullets.map((description) => ({
      title: description,
      dates: "",
      location: "",
      description,
      image: "",
      links: [],
    }));
  }

  for (const project of parsed.projects) {
    const projectStart = projectsText.indexOf(project.title);
    if (projectStart < 0) continue;
    const projectText = projectsText.slice(projectStart, projectsText.indexOf("•", projectStart + 2));
    const technologyMatch = projectText.match(/\|([^-\n]+)/)?.[1];
    const technologies = technologyMatch ? splitTechnologyNames(technologyMatch) : undefined;
    if (technologies?.length) {
      (project as unknown as { technologies: string[] }).technologies =
        formatTechnologyNames(technologies);
    }
  }

  return formatResumeTechnologies(parsed);
}

export async function getResumeData(): Promise<ResumeData> {
  try {
    const response = await fetch(PUBLISHED_RESUME_URL, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`Google Docs returned ${response.status}.`);
    return parsePublishedResume(await response.text());
  } catch (error) {
    console.error("Unable to fetch the published resume; using local portfolio data.", error);
    return formatResumeTechnologies(DATA);
  }
}
