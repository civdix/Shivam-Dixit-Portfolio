import { getResumeData } from "@/data/resume-fetcher";
import { PortfolioPage } from "@/app/page";

export default async function DevPage() {
  return <PortfolioPage data={await getResumeData({ syncWork: true })} />;
}
