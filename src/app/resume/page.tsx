import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { DATA } from "@/data/resume";

export const metadata = {
  title: "Resume",
  description: `${DATA.name}'s resume`,
};

export default function ResumePage() {
  const resumeUrl = DATA.contact.resumeUrl;
  const resumeDownloadUrl = DATA.contact.resumeLocation;
  const embeddedResumeUrl = `${resumeUrl}${resumeUrl.includes("?") ? "&" : "?"}embedded=true`;

  return (
    <main className="flex min-h-dvh flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to portfolio
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            This document is synced from the latest published version. Use the
            document&apos;s download or print controls to save a copy.
          </p>
        </div>
        <a
        href={resumeDownloadUrl}
        target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="size-4" aria-hidden="true" />
          Open / Download
        </a>
      </div>
      <div className="min-h-[70vh] overflow-hidden rounded-xl border bg-muted/20 shadow-sm">
        <iframe
          title={`${DATA.name} resume`}
          src={embeddedResumeUrl}
          className="h-[75vh] min-h-[600px] w-full bg-white"
          loading="eager"
        />
      </div>
    </main>
  );
}
