import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-all duration-200";

export const buttonStyles = {
  primary: `${base} bg-primary text-primary-foreground shadow-soft hover:opacity-90 hover:shadow-lift`,
  outline: `${base} border border-primary/40 bg-surface text-primary hover:border-primary hover:bg-primary-soft`,
  quiet: `${base} border border-border bg-surface text-foreground hover:border-border-strong hover:bg-muted`,
} as const;

type Variant = keyof typeof buttonStyles;

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}: { variant?: Variant; children: ReactNode; className?: string; href: string } & Omit<
  ComponentProps<typeof Link>,
  "href"
>) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant = "quiet",
  children,
  className = "",
  ...props
}: { variant?: Variant; children: ReactNode; className?: string } & ComponentProps<"a">) {
  return (
    <a className={`${buttonStyles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
