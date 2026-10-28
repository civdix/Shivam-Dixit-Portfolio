import { DATA, type ResumeData } from "@/data/resume";
import { Icons } from "@/components/icons";
import { createElement } from "react";

const PUBLISHED_RESUME_URL = DATA.contact.resumeUrl;
const GOOGLE_DRIVE_FILE_ID = "1ouE1cRscddbeKayz-Gf69OvfyBuE1lKVV2EEgm88PVc";
const GOOGLE_DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

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

export interface AchievementLink {
  title: string;
  icon: ReturnType<typeof createElement>;
  href: string;
}

export interface Achievement {
  title: string;
  dates: string;
  location: string;
  description: string;
  image: string;
  links: AchievementLink[];
};

export function parseAchievementsDescription(description: string): Achievement[] | null {
  const json = description
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    const parsed: unknown = JSON.parse(json);
    const values = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && "achievements" in parsed
        ? (parsed as { achievements: unknown }).achievements
        : null;

    if (!Array.isArray(values)) return null;

    const achievements = values.flatMap((value): Achievement[] => {
      if (!value || typeof value !== "object") return [];
      const item = value as Record<string, unknown>;
      if (typeof item.title !== "string") return [];

      const links = Array.isArray(item.links)
        ? item.links.flatMap((link) => {
            if (!link || typeof link !== "object") return [];
            const linkValue = link as Record<string, unknown>;
            if (typeof linkValue.href !== "string") return [];
            return [{
              title: typeof linkValue.title === "string" ? linkValue.title : "View details",
              icon: createElement(Icons.globe, { className: "h-4 w-4" }),
              href: linkValue.href,
            }];
          })
        : [];

      return [{
        title: item.title,
        dates: typeof item.dates === "string" ? item.dates : "",
        location: typeof item.location === "string" ? item.location : "",
        description: typeof item.description === "string" ? item.description : "",
        image: typeof item.image === "string" ? item.image : "",
        links,
      }];
    });

    return achievements.length > 0 ? achievements : null;
  } catch (error) {
    console.error("Unable to parse the Google Drive achievements description.", error);
    return null;
  }
}

export async function fetchDriveAchievements(): Promise<Achievement[] | null> {
  if (!GOOGLE_DRIVE_FILE_ID || !GOOGLE_DRIVE_API_KEY) return null;

  const params = new URLSearchParams({
    key: GOOGLE_DRIVE_API_KEY,
    fields: "description",
  });
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(GOOGLE_DRIVE_FILE_ID)}?${params}`,
    { next: { revalidate: 300 } },
  );
  if (!response.ok) {
    throw new Error(`Google Drive returned ${response.status}.`);
  }

  const file = (await response.json()) as { description?: string };
  return file.description ? parseAchievementsDescription(file.description) : null;
}

function formatResumeDate(value: string) {
  const match = value.match(/(\d{2})\/(\d{4})/);
  if (!match) return value;
  const [, month, year] = match;
  return `${new Date(Number(year), Number(month) - 1).toLocaleString("en-US", {
    month: "short",
  })} ${year}`;
}

function syncWorkExperience(text: string, work: ResumeData["work"]) {
  const experienceText = section(text, "Experience", ["Education"]);
  const companyPatterns = work.map((role) => {
    if (role.company === "GeeksforGeeks") return /Geeks\s*for\s*Geeks/i;
    if (role.company === "Ritual Gurus") return /Ritual\s*Gurus?/i;
    return new RegExp(role.company.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  });
  const companyPositions = companyPatterns.map((pattern) => experienceText.search(pattern));

  return work.map((role, index) => {
    const start = companyPositions[index];
    if (start < 0) return role;

    const end = companyPositions
      .filter((position) => position > start)
      .sort((a, b) => a - b)[0] ?? experienceText.length;
    const roleText = experienceText.slice(start, end);
    const dates = roleText.match(/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{4}/);
    if (!dates) return role;

    const [startDate, endDate] = dates[0].split("-").map((date) => formatResumeDate(date.trim()));
    const description = bullets(roleText.slice((dates.index ?? 0) + dates[0].length));
    return {
      ...role,
      start: startDate,
      end: endDate,
      description: description.length > 0 ? description : role.description,
    };
  });
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

function parsePublishedResume(html: string, syncWork: boolean): ResumeData {
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
  if (syncWork) {
    (parsed as unknown as { work: ResumeData["work"] }).work =
      syncWorkExperience(text, parsed.work) as unknown as ResumeData["work"];
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
    const technologyMatch = projectText.match(/\|([^-\n]+)/)?.[1];
    const technologies = technologyMatch ? splitTechnologyNames(technologyMatch) : undefined;
    if (technologies?.length) {
      (project as unknown as { technologies: string[] }).technologies =
        formatTechnologyNames(technologies);
    }
  }

  return formatResumeTechnologies(parsed);
}

export async function getResumeData(options?: { syncWork?: boolean }): Promise<ResumeData> {
  try {
    const response = await fetch(PUBLISHED_RESUME_URL, {
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`Google Docs returned ${response.status}.`);
    const parsed = parsePublishedResume(await response.text(), options?.syncWork === true);
    try {
      const achievements = await fetchDriveAchievements();
      return achievements
        ? ({ ...parsed, achievements } as unknown as ResumeData)
        : parsed;
    } catch (error) {
      console.error("Unable to fetch Google Drive achievement metadata; using resume achievements.", error);
      return parsed;
    }
  } catch (error) {
    console.error("Unable to fetch the published resume; using local portfolio data.", error);
    return formatResumeTechnologies(DATA);
  }
}
