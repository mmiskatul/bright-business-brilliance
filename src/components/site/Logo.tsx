import { Shield } from "lucide-react";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold shadow-sm ${className}`}
    >
      <span className="font-display tracking-wider text-xs font-black">ASFA</span>
    </div>
  );
}
