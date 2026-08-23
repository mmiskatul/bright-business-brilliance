interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "h-7 w-7", showText = false }: LogoProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <div
        className={`relative flex items-center justify-center rounded-[5px] bg-black text-white shadow-xs transition-transform hover:scale-105 ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[75%] w-[75%]"
        >
          {/* Soccer Ball Outer Ring */}
          <circle cx="16" cy="16" r="9.5" stroke="white" strokeWidth="1.6" />

          {/* Central Pentagon */}
          <polygon
            points="16,11.2 19.8,14 18.3,18.5 13.7,18.5 12.2,14"
            fill="white"
            stroke="white"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Radiating Seams to Outer Perimeter */}
          {/* Top */}
          <line
            x1="16"
            y1="11.2"
            x2="16"
            y2="6.6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Top-Right */}
          <line
            x1="19.8"
            y1="14"
            x2="24.4"
            y2="11.8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bottom-Right */}
          <line
            x1="18.3"
            y1="18.5"
            x2="22.2"
            y2="23.2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Bottom-Left */}
          <line
            x1="13.7"
            y1="18.5"
            x2="9.8"
            y2="23.2"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Top-Left */}
          <line
            x1="12.2"
            y1="14"
            x2="7.6"
            y2="11.8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Outer edge patch accents */}
          <path
            d="M11.8 7.4 C13 6.8 14.5 6.5 16 6.5 C17.5 6.5 19 6.8 20.2 7.4"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M25 15 C25.3 16.2 25.4 17.5 25 18.8"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M7 15 C6.7 16.2 6.6 17.5 7 18.8"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {showText && (
        <span className="font-display text-base font-black tracking-tight text-neutral-900 uppercase">
          ASFA DESIGN
        </span>
      )}
    </div>
  );
}
