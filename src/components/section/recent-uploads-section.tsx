"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RecentUpload = {
  id: string;
  title: string;
};

export default function RecentUploadsSection() {
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/youtube/recent")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Recent uploads request failed: ${response.status}`);
        }
        return response.json() as Promise<{ videos: RecentUpload[] }>;
      })
      .then(({ videos }) => {
        if (!cancelled) setRecentUploads(videos);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.error("Error loading recent YouTube uploads:", error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {[0, 1, 2].map((index) => {
        const video = recentUploads[index];

        if (!video) {
          return (
            <div
              key={`upload-placeholder-${index}`}
              aria-hidden="true"
              className="aspect-video animate-pulse rounded-xl border border-border/60 bg-muted/40"
            />
          );
        }

        return (
          <Link
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            title={video.title}
            aria-label={video.title}
            className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-red-500/40 hover:shadow-md hover:shadow-red-500/[0.06]"
          >
            <div
              aria-hidden="true"
              className="aspect-video w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/mqdefault.jpg)`,
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}
