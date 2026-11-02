import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center"
      aria-live="polite"
      aria-busy="true"
    >
      <LoaderCircle className="size-6 animate-spin text-muted-foreground" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">
        Fetching data from Google Docs...
      </p>
    </main>
  );
}
