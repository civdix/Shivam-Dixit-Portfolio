/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import AchievementsSection from "@/components/section/achievements-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <div className="flex flex-col gap-1.5 text-xs sm:text-sm text-muted-foreground mt-2 border-l-2 border-border pl-4">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="home" className="text-base flex-shrink-0">🏠</span>
                    <span><strong>Home:</strong> Panighat Parikrama Marg, Vrindavan, UP, India, 281121</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="current" className="text-base flex-shrink-0">📍</span>
                    <span><strong>Current Address:</strong> Noida, Sector 135 Wazidpur, UP, India</span>
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar style={{ position: 'absolute' }} className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage style={{ position: 'relative', top: 50, left: 0 }} alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-x-3 justify-between group"
                >
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {education.degree}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                    <span>
                      {education.start} - {education.end}
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="grid gap-6">
            {Object.entries(DATA.skills).map(([category, skills], categoryIndex) => (
              <BlurFade
                key={category}
                delay={BLUR_FADE_DELAY * (10 + categoryIndex)}
              >
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="border bg-background border-border ring-2 ring-border/5 hover:ring-border/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-xl h-8 w-fit px-3 flex items-center gap-2"
                        >
                          {Icon && (
                            <Icon className="size-4 rounded overflow-hidden object-contain flex-shrink-0" />
                          )}
                          <span className="text-foreground text-xs md:text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="achievements">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <AchievementsSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
