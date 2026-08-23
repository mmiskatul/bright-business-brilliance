export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-md bg-primary font-display text-[0.95rem] font-semibold text-primary-foreground ${className}`}
    >
      A
    </span>
  );
}
