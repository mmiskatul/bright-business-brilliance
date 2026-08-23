import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ShoppingBag, Truck, ShieldCheck, Ruler } from "lucide-react";
import { business } from "@/data/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — ASFA Design",
  description:
    "Common questions about ordering football jerseys, custom sublimation teamwear, size guides, wash care, and nationwide delivery in Bangladesh.",
};

const faqs = [
  {
    q: "What fabric grade and GSM do ASFA Design jerseys use?",
    a: "We use authentic 180–190 GSM micro-polyester jacquard knit with hexagonal moisture-wicking weave. This provides maximum breathability, prevents heat trapping, and ensures high durability during competitive matchdays in Bangladesh's climate.",
  },
  {
    q: "How does free player name & squad number printing work?",
    a: "We offer complimentary name and number customization with official club/league font styling on all jersey orders. You can enter your desired name and number on the product page or checkout form, and we heat-press them using industrial vinyl at 160°C.",
  },
  {
    q: "How long does delivery take inside Dhaka and nationwide?",
    a: "Orders inside Dhaka are delivered within 24–48 hours (৳80 delivery charge). Nationwide delivery across all 64 districts takes 48–72 hours via Steadfast / Paperfly courier (৳130 delivery charge). Cash on Delivery is available everywhere in Bangladesh.",
  },
  {
    q: "How do I know my correct size?",
    a: 'Our jerseys follow standard athletic sizing (S: 38" chest, M: 40" chest, L: 42" chest, XL: 44" chest, XXL: 46" chest). If you prefer a relaxed or streetwear oversized fit, we recommend ordering one size larger. A full measurement chart is available on every product page.',
  },
  {
    q: "Can I order custom tournament kits for my team or corporate club?",
    a: "Yes! We manufacture complete custom sublimation teamwear kits with free 3D design mockups, custom club crests, sponsor logos, and player numbers for orders of 10+ jerseys. Turnaround time is typically 5–7 days.",
  },
  {
    q: "What is the proper wash and care procedure?",
    a: "Machine wash cold (30°C) inside out with mild detergent. Air dry in the shade. Do not iron directly over heat-sealed vinyl names, numbers, or silicone badges.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Help & Guidance
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Everything you need to know about our master-quality jerseys, custom teamwear
            manufacturing, size fittings, and nationwide shipping.
          </p>
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.q}
                value={`item-${index}`}
                className="rounded-xl border border-border bg-white px-6 py-2 shadow-xs"
              >
                <AccordionTrigger className="text-left font-bold text-neutral-900 text-sm hover:text-emerald-700">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
            <h3 className="text-lg font-bold text-neutral-900">Still have questions?</h3>
            <p className="mt-2 text-xs text-neutral-600 max-w-md mx-auto">
              Our Dhaka support team is available to assist with sizing advice, custom kit quotes,
              and order tracking.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" variant="primary">
                Contact & Order Direct
              </ButtonLink>
              <ButtonLink href="/products" variant="outline">
                Browse Jersey Catalog
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
