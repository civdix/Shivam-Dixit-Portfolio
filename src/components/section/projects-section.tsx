import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import projectPreviews from "@/data/project-previews.json";

const BLUR_FADE_DELAY = 0.04;

interface GitHubRepo {
    name: string;
    html_url: string;
    homepage: string | null;
    description: string | null;
    pushed_at: string;
    updated_at: string;
    language: string | null;
    topics?: string[];
}

interface MergedProject {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: readonly string[];
    image: string;
    video: string;
    links: readonly {
        icon: React.ReactNode;
        type: string;
        href: string;
    }[];
    timestamp: number;
}

function parseProjectDate(dateStr: string): number {
    const clean = dateStr.split("-")[0].trim();
    const parsed = Date.parse(clean);
    return isNaN(parsed) ? 0 : parsed;
}

export default async function ProjectsSection() {
    let githubProjects: MergedProject[] = [];

    try {
        const res = await fetch("https://api.github.com/users/civdix/repos?sort=updated&per_page=100", {
            next: { revalidate: 60 } // Cache for 60 seconds to respect API limits
        });
        if (res.ok) {
            const repos: GitHubRepo[] = await res.json();
            githubProjects = repos
                .filter((repo) => repo.topics && repo.topics.includes("showcase"))
                .map((repo) => {
                    const preview = (projectPreviews as Record<string, { image?: string; video?: string }>)[repo.name] || {};

                    const pushedDate = new Date(repo.pushed_at);
                    const datesStr = pushedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short"
                    });

                    const techSet = new Set<string>();
                    if (repo.language) techSet.add(repo.language);
                    if (repo.topics) {
                        repo.topics.forEach(topic => techSet.add(topic));
                    }
                    const technologies = Array.from(techSet);

                    const links = [];
                    if (repo.homepage) {
                        links.push({
                            type: "Website",
                            href: repo.homepage,
                            icon: <Icons.globe className="size-3" />
                        });
                    }
                    links.push({
                        type: "Source",
                        href: repo.html_url,
                        icon: <Icons.github className="size-3" />
                    });

                    return {
                        title: repo.name.replace(/[-_]/g, ' '),
                        href: repo.homepage || repo.html_url,
                        dates: datesStr,
                        active: true,
                        description: repo.description || "No description provided.",
                        technologies,
                        image: preview.image || "",
                        video: preview.video || "",
                        links,
                        timestamp: new Date(repo.pushed_at).getTime()
                    };
                });
        }
    } catch (e) {
        console.error("Failed to fetch GitHub projects", e);
    }

    // Merge DATA.projects with fetched githubProjects using url or title as identifier
    const mergedProjects: MergedProject[] = [];

    DATA.projects.forEach((proj) => {
        mergedProjects.push({
            title: proj.title,
            href: proj.href,
            dates: proj.dates,
            active: proj.active,
            description: proj.description,
            technologies: proj.technologies,
            image: proj.image || "",
            video: proj.video || "",
            links: proj.links.map(l => ({
                icon: l.icon,
                type: l.type,
                href: l.href
            })),
            timestamp: parseProjectDate(proj.dates)
        });
    });

    githubProjects.forEach((gitProj) => {
        const exists = mergedProjects.some((existingProj) => {
            const existingUrls = [existingProj.href, ...existingProj.links.map(l => l.href)];
            const gitUrls = [gitProj.href, ...gitProj.links.map(l => l.href)];
            return existingUrls.some(u => gitUrls.includes(u)) ||
                existingProj.title.toLowerCase().replace(/\s/g, '') === gitProj.title.toLowerCase().replace(/\s/g, '');
        });

        if (!exists) {
            mergedProjects.push(gitProj);
        }
    });

    // Sort projects chronologically (newest first)
    mergedProjects.sort((a, b) => b.timestamp - a.timestamp);

    return (
        <section id="projects">
            <div className="flex min-h-0 flex-col gap-y-8">
                <div className="flex flex-col gap-y-4 items-center justify-center">
                    <div className="flex items-center w-full">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Check out my latest work</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
                            I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are my repositories fetched in real-time.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                    {mergedProjects.map((project, id) => (
                        <BlurFade
                            key={project.title}
                            delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                            className="h-full"
                        >
                            <ProjectCard
                                href={project.href}
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                dates={project.dates}
                                tags={project.technologies}
                                image={project.image}
                                video={project.video}
                                links={project.links}
                            />
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}

