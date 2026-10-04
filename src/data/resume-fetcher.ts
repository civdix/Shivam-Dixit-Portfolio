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

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findCompany(text: string, company: string, fromIndex = 0) {
  const aliases: Record<string, string[]> = {
    geeksforgeeks: ["geeksforgeeks", "geeks for geeks"],
    ritualgurus: ["ritualgurus", "ritual gurus", "ritual guru"],
  };
  const candidates = aliases[normalized(company)] ?? [company];

  return candidates
    .map((candidate) => text.toLowerCase().indexOf(candidate.toLowerCase(), fromIndex))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
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
  const experienceText = section(text, "Experience", ["Education"]);
  const educationText = section(text, "Education", ["Projects"]);
  const projectsText = section(text, "Projects", ["Certifications", "Achievements"]);
  const achievementsText = section(text, "Achievements", []);

  const skills: Record<string, readonly { name: string }[]> = { ...parsed.skills };
  for (const item of skillsText.split("•").map((value) => value.trim()).filter(Boolean)) {
    const separator = item.indexOf(":");
    if (separator < 0) continue;
    const category = item.slice(0, separator).trim();
    const values = item
      .slice(separator + 1)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((name) => ({ name }));
    if (values.length > 0) skills[category] = values;
  }
  (parsed as unknown as { skills: typeof skills }).skills = skills;

  for (const work of parsed.work) {
    const mutableWork = work as unknown as {
      company: string;
      description: string[];
      start: string;
      end: string;
    };
    const start = findCompany(experienceText, mutableWork.company);
    if (start < 0) continue;
    const nextStart = parsed.work
      .map((candidate) => findCompany(experienceText, candidate.company, start + mutableWork.company.length))
      .filter((index) => index > start)
      .sort((a, b) => a - b)[0];
    const workText = experienceText.slice(start, nextStart ?? experienceText.length);
    const bulletStart = workText.indexOf("•");
    const workBullets = bullets(
      bulletStart >= 0 ? workText.slice(bulletStart) : workText,
    );
    if (workBullets.length > 0) mutableWork.description = workBullets;
    const date = workText.match(/\d{2}\/\d{4}\s*-\s*(Present|\d{2}\/\d{4})/i);
    if (date) {
      const [startDate, endDate] = date[0].split("-").map((value) => value.trim());
      mutableWork.start = startDate;
      mutableWork.end = endDate;
    }
  }

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
    const technologies = projectText.match(/\|([^-\n]+)/)?.[1]
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (technologies?.length) {
      (project as unknown as { technologies: string[] }).technologies = technologies;
    }
  }

  return parsed;
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
    return DATA;
  }
}
