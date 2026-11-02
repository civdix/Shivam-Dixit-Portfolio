"use client";

import {
  ActivityMap,
  createProxyAdapter,
} from "coding-activity-map";

const platforms = [
  "leetcode",
  "github",
  "codeforces",
  "geeksforgeeks",
] as const;

const adapters = Object.fromEntries(
  platforms.map((platform) => [
    platform,
    createProxyAdapter(platform, `/api/activity/${platform}`),
  ])
);

export default function ActivityMapSection() {
  return (
    <ActivityMap
      usernames={{
        github: "civdix",
        leetcode: "goingtofar",
        geeksforgeeks: "shivamdixit11",
      }}
      adapters={adapters}
      initialPlatforms={["github", "leetcode","geeksforgeeks"]}
      year={2026}
      title="Coding activity"
      colors={{
        high: "#22c55e",
        low: "color-mix(in srgb, #22c55e 45%, var(--muted))",
        empty: "var(--muted)",
      }}
      styles={{
        root: {
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          color: "var(--foreground)",
          overflow: "hidden",
          padding: 16,
          width: "100%",
        },
        header: {
          alignItems: "stretch",
          flexDirection: "column",
          gap: 12,
        },
        title: {
          color: "var(--foreground)",
          fontSize: 18,
          fontWeight: 600,
        },
        subtitle: {
          color: "var(--muted-foreground)",
          margin: "4px 0 0",
        },
        controls: {
          gap: 6,
        },
        toggle: {
          background: "var(--background)",
          borderColor: "var(--border)",
          color: "var(--foreground)",
          fontSize: 11,
          padding: "6px 8px",
        },
        reload: {
          color: "var(--muted-foreground)",
        },
        gridWrap: {
          marginTop: 18,
          overflowX: "auto",
          scrollbarColor: "var(--border) transparent",
          scrollbarWidth: "thin",
        },
        grid: {
          display: "grid",
          gap: 3,
          gridAutoColumns: "11px",
          gridAutoFlow: "column",
          gridTemplateColumns: "repeat(53, 11px)",
          gridTemplateRows: "repeat(7, 11px)",
          minWidth: 640,
          width: "max-content",
        },
        cell: {
          borderRadius: 2,
          height: 11,
          width: 11,
        },
        legend: {
          color: "var(--muted-foreground)",
          marginTop: 10,
        },
        status: {
          color: "var(--muted-foreground)",
          marginTop: 10,
        },
      }}
    />
  );
}