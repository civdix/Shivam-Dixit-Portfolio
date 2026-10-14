import { NextResponse } from "next/server";

const CHANNEL_ID = "UCk2WvK4Q8NDRSzlntYhi_PQ";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const MAX_FEED_ITEMS = 12;
const MAX_RESULTS = 3;

type FeedVideo = {
  id: string;
  title: string;
};

function getFeedVideos(xml: string): FeedVideo[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .slice(0, MAX_FEED_ITEMS)
    .map((match) => {
      const entry = match[1];
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<media:title>([\s\S]*?)<\/media:title>/)?.[1];

      return id && title
        ? { id, title: title.replace(/&amp;/g, "&").trim() }
        : null;
    })
    .filter((video): video is FeedVideo => video !== null);
}

async function isShort(videoId: string): Promise<boolean> {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9" },
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`Failed to inspect YouTube video ${videoId}: ${response.status}`);
  }

  const html = await response.text();
  const duration = html.match(/"lengthSeconds":"(\d+)"/)?.[1];

  return duration !== undefined && Number(duration) <= 60;
}

export async function GET() {
  try {
    const response = await fetch(YOUTUBE_FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
    }

    const videos = getFeedVideos(await response.text());
    const regularVideos: FeedVideo[] = [];

    for (const video of videos) {
      if (!(await isShort(video.id))) regularVideos.push(video);
      if (regularVideos.length === MAX_RESULTS) break;
    }

    return NextResponse.json({ videos: regularVideos });
  } catch (error: unknown) {
    console.error("Error fetching recent YouTube uploads:", error);
    return NextResponse.json(
      { error: "Unable to load recent uploads." },
      { status: 502 },
    );
  }
}
