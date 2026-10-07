import { ProjectCard } from "@/components/project-card";
import { ArrowUpRight, BriefcaseBusiness, Mail, Sparkles } from "lucide-react";
import type { ResumeData } from "@/data/resume";

export default function FounderPage({ data }: { data: ResumeData }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-20 pb-20 sm:gap-28">
      <section className="relative overflow-hidden border-b border-border/70 pb-16 pt-10 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />
        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="max-w-4xl space-y-7">
            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
              <Sparkles className="size-4" aria-hidden="true" />
              Rent on Cent / Founder&apos;s Office
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-7xl lg:text-8xl">
              Building useful digital products from the ground up.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A client-facing look at {data.name}&apos;s work across software,
              AI systems, and products made for real people.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                <Mail className="size-4" aria-hidden="true" />
                Start a conversation
              </a>
              <a
                href={data.contact.resumeLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                View credentials
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            <div className="bg-background p-5 sm:p-6">
              <p className="text-3xl font-semibold tracking-tight">{data.projects.length}</p>
              <p className="mt-1 text-sm text-muted-foreground">Products shipped</p>
            </div>
            <div className="bg-background p-5 sm:p-6">
              <p className="text-3xl font-semibold tracking-tight">20M+</p>
              <p className="mt-1 text-sm text-muted-foreground">Users supported</p>
            </div>
            <div className="col-span-2 bg-background p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Focused on scalable web platforms, automation, and AI-native
                workflows that create measurable momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">Experience</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Work with substance.</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {data.work.map((role) => (
            <article key={`${role.company}-${role.start}`} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <h3 className="font-semibold">{role.title}</h3>
                </div>
                <a href={role.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  {role.company}
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {role.description.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <p className="text-sm text-muted-foreground sm:text-right">{role.start} - {role.end}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A portfolio built in public.</h2>
          </div>
          <a href={`mailto:${data.contact.email}`} className="hidden items-center gap-1 text-sm font-medium hover:underline sm:inline-flex">
            Discuss a project <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              href={project.href}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          ))}
        </div>
      </section>
    </main>
  );
}