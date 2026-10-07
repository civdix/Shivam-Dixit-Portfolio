import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FOUNDER_HOSTNAME = "founder.rentoncent.bond";
export const FOUNDER_SITE_URL = `https://${FOUNDER_HOSTNAME}`;

export function isFounderHostname(hostname: string | null | undefined) {
  return hostname?.split(":")[0].toLowerCase() === FOUNDER_HOSTNAME;
}

export function formatDate(date: string | Date) {
  // Use UTC to ensure consistent formatting between server and client
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
