import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { headers } from "next/headers";
import { FOUNDER_SITE_URL, isFounderHostname } from "@/lib/utils";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const siteUrl = isFounderHostname(requestHeaders.get("host"))
    ? FOUNDER_SITE_URL
    : DATA.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}