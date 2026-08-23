import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center text-neutral-900">
      <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700">
        404 — Page Not Found
      </span>
      <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 uppercase">
        Matchday Item Not Found
      </h1>
      <p className="mt-3 max-w-md text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
        The jersey, squad package, or page you are looking for does not exist or has been retired.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
