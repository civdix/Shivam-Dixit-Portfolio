"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Youtube, Play, Users, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const YouTubeIconWithRedPlay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.553a3.003 3.003 0 00-2.11 2.11C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 002.11 2.11C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.553a3.003 3.003 0 002.11-2.11C24 15.97 24 12 24 12s0-3.97-.502-5.837z"
      fill="currentColor"
    />
    <polygon
      points="9.545,15.568 9.545,8.432 15.818,12"
      fill="#dc2626"
    />
  </svg>
);

interface YouTubeStats {
  subscribers: string;
  views: string;
  videos: string;
}

export default function YoutubeSection() {
  const [stats, setStats] = useState<YouTubeStats | null>(null);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading YouTube stats", err));
  }, []);

  const featuredVideos = [
    {
      title: "Building Production-grade RAG Pipelines",
      concept: "Retrieval-Augmented Generation",
      tags: ["OpenAI", "LangChain", "Vector DBs"],
      duration: "18 mins",
    },
    {
      title: "Real-time Video & Audio Apps using WebSockets",
      concept: "Real-time Communication",
      tags: ["WebSockets", "WebRTC", "Node.js"],
      duration: "24 mins",
    },
    {
      title: "Next.js 16 SSR & SEO Optimization",
      concept: "Advanced Frontend Architecture",
      tags: ["Next.js", "SSR", "Web Vitals"],
      duration: "15 mins",
    },
  ];

  return (
    <section id="youtube" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        {/* Section Header Divider */}
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border border-red-500/20 bg-red-500/5 dark:bg-red-500/10 z-10 rounded-xl px-4 py-1 flex items-center gap-1.5">
              <Youtube className="size-4 text-red-500 animate-pulse" />
              <span className="text-foreground text-sm font-medium">YouTube</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">YouTube Spotlight</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Watch step-by-step guides on building AI agents, scalable architectures, and advanced full-stack systems.
            </p>
          </div>
        </div>

        {/* Main Channel Highlight Card */}
        <div className="relative border border-border/80 bg-linear-to-br from-card to-muted/30 p-6 sm:p-8 rounded-2xl overflow-hidden shadow-sm group hover:border-red-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl -z-10 group-hover:bg-red-500/10 dark:group-hover:bg-red-500/15 transition-all duration-300" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-red-500">Featured Channel</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  Shivam Dixit
                  <span className="text-muted-foreground text-base font-normal">@shivdix</span>
                </h3>
                {/* Stats Bar */}
                <div className="flex gap-4 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="text-foreground font-bold">{stats?.subscribers || "2.32K"}</span> Subscribers
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground font-bold">{stats?.views || "17,974"}</span> Views
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground font-bold">{stats?.videos || "97"}</span> Videos
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm max-w-[500px]">
                I share deep dives on implementing Retrieval-Augmented Generation, fine-tuning large language models, setting up event-driven systems, and modern web application patterns.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="outline" className="flex items-center gap-1 border-border/80 text-xs">
                  <Cpu className="size-3 text-red-500" /> AI & LLMs
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 border-border/80 text-xs">
                  <Sparkles className="size-3 text-red-500" /> System Design
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 border-border/80 text-xs">
                  <Users className="size-3 text-red-500" /> Code Walkthroughs
                </Badge>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="https://www.youtube.com/@shivdix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-48 inline-flex items-center justify-center gap-2 border bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]"
              >
                <YouTubeIconWithRedPlay className="size-5 text-white" />
                Subscribe
              </Link>
              <Link
                href="https://www.youtube.com/@shivdix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-48 inline-flex items-center justify-center gap-2 border bg-background border-border hover:bg-muted text-foreground font-medium px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-[0.98] group/btn"
              >
                <span>View Channel</span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredVideos.map((video, idx) => (
            <Link
              key={idx}
              href="https://www.youtube.com/@shivdix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between border border-border/60 bg-card hover:bg-muted/10 p-5 rounded-2xl transition-all duration-300 hover:border-red-500/20 hover:shadow-md hover:shadow-red-500/[0.03] group/card cursor-pointer"
            >
              <div className="space-y-3">
                <div className="relative aspect-video w-full rounded-xl bg-linear-to-tr from-red-600/5 to-pink-600/5 border border-border/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-red-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="size-12 rounded-full bg-white dark:bg-zinc-900 border shadow-md flex items-center justify-center group-hover/card:scale-110 group-hover/card:bg-red-600 group-hover/card:border-red-600 transition-all duration-300">
                    <Play className="size-5 text-red-600 fill-red-600 translate-x-0.5 group-hover/card:text-white group-hover/card:fill-white transition-colors duration-300" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] font-medium bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {video.duration}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wide">
                    {video.concept}
                  </span>
                  <h4 className="font-semibold text-sm leading-snug group-hover/card:text-red-500 transition-colors duration-200">
                    {video.title}
                  </h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {video.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="text-[10px] text-muted-foreground bg-muted/60 border px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
