import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles on software engineering, distributed systems, caching, and database design.",
  openGraph: {
    title: "Blog",
    description: "Technical articles on software engineering, distributed systems, caching, and database design.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Technical articles on software engineering, distributed systems, caching, and database design.",
  },
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

interface BlogPost {
  title: string;
  url: string;
  publishedAt: string;
  isExternal: boolean;
  slug?: string;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  let bloggerPosts: BlogPost[] = [];
  let fetchSuccess = false;

  try {
    const res = await fetch("https://shivamfrommathura.blogspot.com/feeds/posts/default?alt=json", {
      next: { revalidate: 3600 } // cache for 1 hour
    });
    if (res.ok) {
      const data = await res.json();
      if (data.feed && data.feed.entry) {
        bloggerPosts = data.feed.entry.map((entry: any) => {
          const alternateLink = entry.link.find((l: any) => l.rel === "alternate");
          return {
            title: entry.title?.$t || "Untitled Post",
            url: alternateLink?.href || "https://shivamfrommathura.blogspot.com",
            publishedAt: new Date(entry.published?.$t).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }),
            isExternal: true
          };
        });
        fetchSuccess = true;
      }
    }
  } catch (e) {
    console.error("Failed to fetch Blogger posts", e);
  }

  // Combine or fall back
  let displayPosts: BlogPost[] = [];
  if (fetchSuccess && bloggerPosts.length > 0) {
    displayPosts = bloggerPosts;
  } else {
    // Fallback to local posts
    displayPosts = allPosts.map(post => ({
      title: post.title,
      url: `/blog/${post._meta.path.replace(/\.mdx$/, "")}`,
      publishedAt: post.publishedAt,
      isExternal: false,
      slug: post._meta.path.replace(/\.mdx$/, "")
    }));
  }

  // Sort posts by publishedAt desc
  displayPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const totalPages = Math.ceil(displayPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(displayPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Blog{" "}
            <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
              {displayPosts.length} posts
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            My articles on software development, distributed systems, caching, and database design.
          </p>
          <div className="mt-4 p-4 border border-border rounded-xl bg-muted/30 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Official Blogger Site</span>
              <span className="text-sm font-medium text-foreground">shivamfrommathura.blogspot.com</span>
            </div>
            <a
              href="https://shivamfrommathura.blogspot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Visit Site
            </a>
          </div>
        </div>
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {paginatedPosts.map((post, id) => {
                const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1;
                const isExternal = post.isExternal;
                
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.url}>
                    <a
                      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={post.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors flex items-center gap-1.5">
                            {post.title}
                            {isExternal && (
                              <svg className="size-3 text-muted-foreground opacity-50 shrink-0 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                              </svg>
                            )}
                            <ChevronRight
                              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.publishedAt}
                        </p>
                      </div>
                    </a>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex gap-3 flex-row items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
