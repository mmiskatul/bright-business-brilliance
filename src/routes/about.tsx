import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { business } from "@/data/site";
import aboutHero from "@/assets/gallery-colors.jpg";
import environment from "@/assets/gallery-typography.jpg";

const title = "About Arman — Freelance Graphic Designer";
const description =
  "The story behind Arman Graphic Design: a one-person studio focused on logos, brand identity and print-ready artwork for small businesses.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  {
    title: "Clarity before decoration",
    body: "If a mark cannot be understood at thumbnail size, no amount of gradient will save it. Legibility comes first.",
  },
  {
    title: "Honest scope",
    body: "What is included, how many revisions and which files you receive are agreed in writing before work begins.",
  },
  {
    title: "Respect for print",
    body: "Files are prepared for the press properly — bleed, margins, colour mode — so a print run is never wasted.",
  },
  {
    title: "Long-term usefulness",
    body: "The goal is an identity you can still apply in two years without commissioning it again.",
  },
];

function About() {
  return (
    <>
      <Section tone="surface">
        <div className="grid items-end gap-10 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 text-4xl sm:text-5xl">
              A small studio built around one designer's hands.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {business.name} began as design work shared on Facebook and grew
              through the clients who came from it — shops, small brands and
              product makers who needed visuals they could actually use.
            </p>
          </div>
          <img
            src={aboutHero}
            alt="Colour swatch fans spread across white paper in bright daylight"
            width={1100}
            height={1400}
            className="max-h-[26rem] w-full rounded-lg border object-cover shadow-soft"
          />
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Our story" title="How the studio started" />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              The studio runs under the name {business.shortName}, and it started
              the way many small design practices do: posting finished pieces
              publicly, answering questions in messages, and taking on the jobs
              that followed.
            </p>
            <p>
              That direct route from message to finished file is still how the
              work happens. There is no queue of intermediaries, no brief passed
              between hands — you describe the business, and the person designing
              it reads your words themselves.
            </p>
            <p className="text-sm italic">
              Note for the owner: dates, milestones and client names from the
              Facebook page can be dropped straight into this section.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Identity, digital and print — in that order"
          description="Most projects start with an identity problem and then branch outward into the places the brand has to appear."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Identity", "Logos, wordmarks, colour palettes, type pairings and usage rules."],
            ["Digital", "Social media posts and stories, covers, and simple ad creatives."],
            ["Print", "Flyers, posters, banners, menus, cards, labels and packaging artwork."],
          ].map(([heading, body]) => (
            <div key={heading} className="rounded-md border bg-card p-7 shadow-soft">
              <h3 className="text-xl">{heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="alt" bordered>
        <SectionHeading eyebrow="Our values" title="What the work is held to" />
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t pt-6">
              <h3 className="text-lg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The working environment"
              title="Quiet desk, daylight, and a lot of paper"
              description="Concepts are pinned up and lived with before they are shown. It is a slower first step that saves rounds of revision later."
            />
            <ButtonLink to="/contact" variant="primary" className="mt-8">
              Talk about your project
            </ButtonLink>
          </div>
          <img
            src={environment}
            alt="Typography specimen sheets pinned to a bright studio wall"
            width={1000}
            height={1300}
            loading="lazy"
            className="max-h-[30rem] w-full rounded-lg border object-cover shadow-soft"
          />
        </div>
      </Section>
    </>
  );
}
