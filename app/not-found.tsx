import Link from "next/link";
import { site } from "@/content/site";

export const metadata = { title: `Not found — ${site.name}` };

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col justify-center gap-6 py-24">
      <p className="font-mono type-label uppercase text-muted-foreground">404 — Not found</p>
      <h1 className="type-h2 font-bold">This page doesn&rsquo;t exist.</h1>
      <p className="max-w-[38rem] type-lead text-ink-2">The whole site is one page.</p>
      <p>
        <Link href="/" className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:text-brand">
          ← Back to {site.shortName}
        </Link>
      </p>
    </main>
  );
}
