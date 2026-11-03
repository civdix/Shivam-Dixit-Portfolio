"use client";

import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

interface ProjectGridProps {
    children: React.ReactNode[];
}

const PROJECTS_PER_BATCH = 4;

export function ProjectGrid({ children }: ProjectGridProps) {
    const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_BATCH);
    const [showPrompt, setShowPrompt] = useState(false);
    const hasMoreProjects = visibleCount < children.length;

    useEffect(() => {
        if (hasMoreProjects && sessionStorage.getItem("projects-more-prompt-dismissed") !== "true") {
            const promptTimer = window.setTimeout(() => setShowPrompt(true), 0);
            return () => window.clearTimeout(promptTimer);
        }
    }, [hasMoreProjects]);

    function loadMoreProjects() {
        setVisibleCount((count) => count + PROJECTS_PER_BATCH);
        setShowPrompt(false);
        sessionStorage.setItem("projects-more-prompt-dismissed", "true");
    }

    function dismissPrompt() {
        setShowPrompt(false);
        sessionStorage.setItem("projects-more-prompt-dismissed", "true");
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto auto-rows-fr">
                {children.slice(0, visibleCount)}
            </div>
            {hasMoreProjects && (
                <div className="relative mt-8 flex justify-center">
                    {showPrompt && (
                        <div
                            className="absolute bottom-full z-10 mb-3 flex max-w-xs items-center gap-3 rounded-xl border border-primary/20 bg-background px-4 py-3 text-left text-sm shadow-xl shadow-primary/10"
                            role="status"
                        >
                            <p>
                                Want to see more of my work?{" "}
                                <button
                                    type="button"
                                    onClick={loadMoreProjects}
                                    className="font-semibold text-primary underline-offset-4 hover:underline"
                                >
                                    Explore more
                                </button>
                            </p>
                            <button
                                type="button"
                                onClick={dismissPrompt}
                                aria-label="Dismiss more projects tip"
                                className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                <X className="size-3.5" aria-hidden />
                            </button>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={loadMoreProjects}
                        className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <span>View Other projects</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </button>
                </div>
            )}
        </>
    );
}
