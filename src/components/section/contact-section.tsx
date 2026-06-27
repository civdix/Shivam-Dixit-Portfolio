"use client";

import { useState } from "react";
import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

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
    </div>
  );
}
