interface LogoProps {
  className?: string;
  variant?: "dark" | "emerald";
  showText?: boolean;
}

export function Logo({ className = "h-7 w-7", variant = "dark", showText = false }: LogoProps) {
  const isEmerald = variant === "emerald";
  const bgClass = isEmerald ? "bg-emerald-700 text-white" : "bg-neutral-900 text-white";

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`relative flex items-center justify-center rounded-lg ${bgClass} shadow-xs transition-transform hover:scale-105 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4/5 w-4/5"
        >
          {/* Outer Sport Shield Contour */}
          <path
            d="M16 3.5L26 7.5V16.5C26 23 16 28.5 16 28.5C16 28.5 6 23 6 16.5V7.5L16 3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          />
          {/* Dynamic Athletic 'A' Chevron Vector */}
          <path d="M16 7L21.5 21H18L16 15.5L14 21H10.5L16 7Z" fill="currentColor" />
          <path d="M13.5 17.5H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <span className="font-display text-sm font-black tracking-wider text-neutral-900 uppercase">
          ASFA DESIGN
        </span>
      )}
    </div>
  );
}
