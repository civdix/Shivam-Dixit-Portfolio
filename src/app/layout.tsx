import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { getResumeData } from "@/data/resume-fetcher";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Analytics } from '@vercel/analytics/next';
import { headers } from "next/headers";
import { FOUNDER_SITE_URL, isFounderHostname } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

const portfolioMetadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} | AI Software Engineer Portfolio`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  applicationName: DATA.name,
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  keywords: [
    "Shivam Dixit",
    "AI software engineer",
    "software engineer portfolio",
    "distributed systems",
    "React",
    "Next.js",
    "Python",
    "Node.js",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${DATA.name} - ${DATA.description}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    description: DATA.description,
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const founderMetadata: Metadata = {
  metadataBase: new URL(FOUNDER_SITE_URL),
  title: {
    default: "Software Engineer in Mathura & Vrindavan | Shivam Dixit",
    template: `%s | Shivam Dixit - Software Engineer in Mathura`,
  },
  description:
    "Shivam Dixit is a software engineer and website development partner serving businesses in Mathura and Vrindavan with websites, web apps, automation, and AI solutions.",
  applicationName: "Shivam Dixit Software Development Services",
  authors: [{ name: "Shivam Dixit", url: FOUNDER_SITE_URL }],
  creator: "Shivam Dixit",
  publisher: "Shivam Dixit",
  keywords: [
    "software engineer in Mathura",
    "software developer in Vrindavan",
    "website development company Mathura",
    "website developer Vrindavan",
    "web development services Mathura",
    "custom website development Vrindavan",
    "web application developer Mathura",
    "AI automation services Vrindavan",
    "software development company near me",
    "Shivam Dixit",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Software Engineer & Website Developer in Mathura and Vrindavan",
    description:
      "Websites, web applications, automation, and AI solutions for businesses in Mathura, Vrindavan, and beyond.",
    url: FOUNDER_SITE_URL,
    siteName: "Shivam Dixit Software Development Services",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shivam Dixit - Software Engineer in Mathura and Vrindavan" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  twitter: {
    title: "Software Engineer in Mathura & Vrindavan | Shivam Dixit",
    description:
      "Website development, web apps, automation, and AI solutions for local businesses.",
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  return isFounderHostname(requestHeaders.get("host"))
    ? founderMetadata
    : portfolioMetadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resumeData = await getResumeData();
  const requestHeaders = await headers();
  const isFounderDomain = isFounderHostname(requestHeaders.get("host"));
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className={cn(
              "relative z-10 mx-auto px-6",
              isFounderDomain ? "w-full py-8 sm:py-10" : "max-w-2xl py-12 pb-24 sm:py-24",
            )}>
              {children}
            </div>
            {!isFounderDomain && <Navbar data={resumeData} />}
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
