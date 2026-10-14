import Link from "next/link";

const recentUploads = [
  {
    id: "l3MyJNX9Y3Y",
    title: "Puri life khatam karne wali galti",
  },
  {
    id: "65N4CmQ4ObA",
    title: "Recent upload",
  },
  {
    id: "yWCe2sO2koc",
    title: "Html + Css = Survey Layout",
  },
];

export default function RecentUploadsSection() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {recentUploads.map((video) => (
        <Link
          key={video.id}
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          title={video.title}
          aria-label={video.title}
          className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-red-500/40 hover:shadow-md hover:shadow-red-500/[0.06]"
        >
          <div
            aria-hidden="true"
            className="aspect-video w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/mqdefault.jpg)`,
            }}
          />
        </Link>
      ))}
    </div>
  );
}
