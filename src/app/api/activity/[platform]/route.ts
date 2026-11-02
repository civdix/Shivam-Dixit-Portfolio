import { fetchPlatformActivity } from "coding-activity-map/server";
import type { Platform } from "coding-activity-map";

const supportedPlatforms: Platform[] = [
  "leetcode",
  "github",
  "codeforces",
  "geeksforgeeks",
];

export async function GET(
  request: Request,
  context: { params: Promise<{ platform: string }> }
) {
  const { platform } = await context.params;
  const url = new URL(request.url);
  const username = url.searchParams.get("handle");
  const year = Number(url.searchParams.get("year"));

  if (
    !supportedPlatforms.includes(platform as Platform) ||
    !username ||
    !Number.isInteger(year)
  ) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const activity = await fetchPlatformActivity(
      platform as Platform,
      username,
      year
    );

    return Response.json(activity, {
      headers: { "Cache-Control": "s-maxage=3600" },
    });
  } catch {
    return Response.json(
      { error: "Unable to load activity" },
      { status: 502 }
    );
  }
}