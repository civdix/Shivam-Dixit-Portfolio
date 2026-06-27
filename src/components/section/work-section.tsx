/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TechIcon } from "@/components/tech-icon";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function WorkSection() {
  const [openItems, setOpenItems] = useState<string[]>([DATA.work[0]?.company || ""]);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const isManualClick = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevPositionsRef = useRef<Map<string, { height: number; bottom: number }>>(new Map());

  const handleValueChange = (val: string[]) => {
    isManualClick.current = true;
    setOpenItems(val);
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isManualClick.current = false;
    }, 800);
  };

  useLayoutEffect(() => {
    if (isManualClick.current || prevPositionsRef.current.size === 0) {
      return;
    }

    const topThreshold = 80;
    let totalAdjustment = 0;

    prevPositionsRef.current.forEach((prev, company) => {
      const node = itemRefs.current.get(company);
      if (node) {
        const newHeight = node.offsetHeight;
        const diff = prev.height - newHeight;

        // If the height changed and the element was above/at the top viewport threshold
        if (diff !== 0 && prev.bottom <= topThreshold + 10) {
          totalAdjustment += diff;
        }
      }
    });

    if (totalAdjustment !== 0) {
      window.scrollBy(0, -totalAdjustment);
    }

    prevPositionsRef.current.clear();
  }, [openItems]);

  useEffect(() => {
    let lastScrollTop = window.scrollY;

    const handleScroll = () => {
      if (isManualClick.current) {
        lastScrollTop = window.scrollY;
        return;
      }

      const scrollTop = window.scrollY;
      const isDown = scrollTop > lastScrollTop;
      lastScrollTop = scrollTop;

      const topThreshold = 80;
      const viewportHeight = window.innerHeight;

      // Get current rects of all items
      const items = DATA.work.map((w) => {
        const node = itemRefs.current.get(w.company);
        return {
          company: w.company,
          rect: node ? node.getBoundingClientRect() : null,
        };
      });

      let nextOpenItems = [...openItems];
      let stateChanged = false;

      if (isDown) {
        // Scrolling down
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (!item.rect) continue;

          // If this item is currently open
          if (nextOpenItems.includes(item.company)) {
            // 1. If half of this item's content goes out of the top of the viewport, show the next one
            const hasScrolledHalfOut = item.rect.top + item.rect.height / 2 <= topThreshold;
            if (hasScrolledHalfOut && i < items.length - 1) {
              const nextCompany = items[i + 1].company;
              if (!nextOpenItems.includes(nextCompany)) {
                nextOpenItems.push(nextCompany);
                stateChanged = true;
              }
            }
          }
        }
      } else {
        // Scrolling up
        for (let i = items.length - 1; i >= 0; i--) {
          const item = items[i];
          if (!item.rect) continue;

          // If this item is closed, but its bottom comes back into the viewport (bottom > topThreshold)
          // and it is the item above the current open items
          if (!nextOpenItems.includes(item.company)) {
            const isEnteringFromTop = item.rect.bottom > topThreshold && item.rect.top < viewportHeight;
            if (isEnteringFromTop) {
              const hasOpenBelow = items.slice(i + 1).some(belowItem => nextOpenItems.includes(belowItem.company));
              if (hasOpenBelow) {
                nextOpenItems.push(item.company);
                stateChanged = true;
              }
            }
          }
        }
      }

      if (stateChanged) {
        // Ensure at least one item remains open
        if (nextOpenItems.length === 0) {
          nextOpenItems = [DATA.work[0].company];
        }

        // Record current positions before applying the state update
        const currentPositions = new Map<string, { height: number; bottom: number }>();
        DATA.work.forEach((w) => {
          const node = itemRefs.current.get(w.company);
          if (node) {
            currentPositions.set(w.company, {
              height: node.offsetHeight,
              bottom: node.getBoundingClientRect().bottom,
            });
          }
        });
        prevPositionsRef.current = currentPositions;

        setOpenItems(nextOpenItems);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, [openItems]);

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={handleValueChange}
      className="w-full grid gap-6"
    >
      {DATA.work.map((work) => (
        <div
          key={work.company}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(work.company, el);
            } else {
              itemRefs.current.delete(work.company);
            }
          }}
          className="scroll-mt-20"
        >
          <AccordionItem
            value={work.company}
            className="w-full border-b-0 grid gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
              <div className="flex items-center gap-x-3 justify-between w-full text-left">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <LogoImage src={work.logoUrl} alt={work.company} />
                  <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                    <div className="font-semibold leading-none flex items-center gap-2">
                      {work.company}
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {work.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm tabular-nums text-muted-foreground text-right flex-none">
                  <span>
                    {work.start} - {work.end ?? "Present"}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform duration-300 ease-in-out flex-none",
                      openItems.includes(work.company) && "rotate-180"
                    )}
                  />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-11 md:ml-13 text-xs sm:text-sm text-muted-foreground data-[state=open]:animate-none! data-[state=closed]:animate-none!">
              {work.badges && work.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                  {work.badges.map((badge) => (
                    <Badge
                      key={badge}
                      className="text-[11px] font-medium border border-border h-6 w-fit px-2 py-0 flex items-center gap-1.5 bg-background text-foreground hover:bg-muted/50"
                      variant="outline"
                    >
                      <TechIcon name={badge} className="size-3.5 object-contain rounded-xs" />
                      <span>{badge}</span>
                    </Badge>
                  ))}
                </div>
              )}
              <ul className="list-disc pl-4 space-y-1.5 mt-2">
                {work.description.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </div>
      ))}
    </Accordion>
  );
}
