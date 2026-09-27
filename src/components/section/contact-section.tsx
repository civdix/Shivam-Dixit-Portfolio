"use client";

import { useState } from "react";
import Link from "next/link";
import { ListMusic, Music2 } from "lucide-react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const playlistId = "3NbHTIlZSqS8LOdIYUoBRA";

  const handleCopy = () => {
    const resumeUrl = DATA.contact.resumeUrl || "/resume.pdf";
    const fullUrl = typeof window !== "undefined"
      ? `${window.location.origin}${resumeUrl}`
      : resumeUrl;

    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border rounded-xl p-10 relative">
      <button
        type="button"
        aria-label={showPlaylist ? "Hide playlist" : "Show playlist"}
        aria-pressed={showPlaylist}
        onClick={() => setShowPlaylist((isVisible) => !isVisible)}
        className="group absolute right-4 top-4 z-10 size-11 [perspective:600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
      >
        <span
          className={`relative block size-full rounded-full border border-[#1ed760]/40 bg-[#1ed760]/10 text-[#1ed760] shadow-sm transition-transform duration-700 [transform-style:preserve-3d] group-hover:shadow-[#1ed760]/30 group-hover:shadow-lg ${showPlaylist ? "[transform:rotateY(180deg)]" : ""}`}
        >
          <span className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]">
            <Music2 className="size-5" aria-hidden="true" />
          </span>
          <span className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <ListMusic className="size-5" aria-hidden="true" />
          </span>
        </span>
      </button>
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just shoot me a message{" "}
          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            on LinkedIn
          </Link>{" "}
          and I&apos;ll respond whenever I can. I will ignore all
          soliciting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2 text-sm font-medium text-muted-foreground">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <span>📧</span> {DATA.contact.email}
          </a>
          <span className="hidden sm:inline text-muted-foreground/30">|</span>
          <a
            href={`tel:${DATA.contact.tel}`}
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <span>📞</span> {DATA.contact.tel}
          </a>
        </div>

        {/* Resume pills */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 justify-center text-sm font-medium">
          <a
            href={DATA.contact.resumeLocation || "/resume.pdf"}
            download={"Shivam_Dixit_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border bg-primary hover:bg-primary/90 text-background px-4 py-1.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>📄</span> Download Resume
          </a>
          <span className="text-xs text-muted-foreground/60 font-semibold uppercase">or</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 border bg-background border-border hover:bg-muted text-foreground px-4 py-1.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>🔗</span> {copied ? "Copied!" : "Copy Resume Link"}
          </button>
        </div>
      </div>
      <div
        className={`relative z-[1] grid transition-[grid-template-rows,opacity,margin] duration-700 ease-in-out ${showPlaylist ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
        aria-hidden={!showPlaylist}
      >
        <div className="min-h-0 overflow-hidden border-t border-border/70 pt-6">
          <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <Music2 className="size-4 text-[#1ed760]" aria-hidden="true" />
            <span>Currently listening</span>
          </div>
          <iframe
            title="Spotify Embed: Recommendation Playlist"
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            style={{ minHeight: "360px" }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
