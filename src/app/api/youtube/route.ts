import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = "https://www.youtube.com/@shivdix";
  
  // Default fallback values
  let subscriberCount = "2.32K";
  let viewsCount = "413,741";
  let videoCount = "97";

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch channel page: ${res.statusText}`);
    }

    const html = await res.text();
    
    // Parse API Key and Browse ID
    const apiKeyMatch = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/) || html.match(/"apiKey":"([^"]+)"/);
    const descIdx = html.indexOf('"descriptionPreviewViewModel":');
    
    if (apiKeyMatch && descIdx !== -1) {
      const apiKey = apiKeyMatch[1];
      const tokenMatch = html.substring(descIdx, descIdx + 5000).match(/"token":"([^"]+)"/);
      
      if (tokenMatch) {
        const token = tokenMatch[1];
        
        // Fetch real-time stats via InnerTube browse continuation
        const innerTubeUrl = `https://www.youtube.com/youtubei/v1/browse?key=${apiKey}`;
        const postRes = await fetch(innerTubeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: "WEB",
                clientVersion: "2.20240101.01.00",
                hl: "en",
                gl: "US"
              }
            },
            continuation: token
          })
        });

        if (postRes.ok) {
          const data = await postRes.json();
          const viewModel = data?.onResponseReceivedEndpoints?.[0]?.appendContinuationItemsAction?.continuationItems?.[0]?.aboutChannelRenderer?.metadata?.aboutChannelViewModel;
          
          if (viewModel) {
            if (viewModel.subscriberCountText) {
              subscriberCount = viewModel.subscriberCountText.replace(" subscribers", "").trim();
            }
            if (viewModel.viewCountText) {
              viewsCount = viewModel.viewCountText.replace(" views", "").trim();
            }
            if (viewModel.videoCountText) {
              videoCount = viewModel.videoCountText.replace(" videos", "").trim();
            }
            
            return NextResponse.json({
              subscribers: subscriberCount,
              views: viewsCount,
              videos: videoCount,
            });
          }
        }
      }
    }

    // Fallback: extract subscriber count from main page HTML if InnerTube fails
    const subMatch = html.match(/"content":"([^"]+ subscribers)"/);
    if (subMatch) {
      subscriberCount = subMatch[1].replace(" subscribers", "");
    }
    
    // Fallback: extract video count from main page HTML if InnerTube fails
    const contentVideoMatch = html.match(/"content":"(\d+)\s+videos"/i);
    if (contentVideoMatch) {
      videoCount = contentVideoMatch[1];
    }

    return NextResponse.json({
      subscribers: subscriberCount,
      views: viewsCount,
      videos: videoCount,
    });
  } catch (error: any) {
    console.error("Error fetching YouTube stats:", error);
    return NextResponse.json({
      subscribers: subscriberCount,
      views: viewsCount,
      videos: videoCount,
    });
  }
}
