import type { ReactNode } from "react";

type Tone = "surface" | "alt" | "tint";

const tones: Record<Tone, string> = {
  surface: "bg-surface",
  alt: "bg-surface-alt",
  tint: "bg-primary-soft",
};

export function Section({
  children,
  tone = "surface",
  className = "",
  id,
  bordered = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${bordered ? "border-y" : ""} py-16 md:py-24 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
