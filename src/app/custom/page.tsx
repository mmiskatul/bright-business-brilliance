"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, PenTool, Layers, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const processSteps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "Dedicated account managers work with you to understand your team's specific requirements, budget, and timeline.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design",
    description:
      "Our technical design team produces digital mockups and fabric selections, ensuring brand alignment and aesthetic impact.",
  },
  {
    step: "03",
    icon: Layers,
    title: "Production",
    description:
      "Manufacturing commences in our pro-grade facilities, utilizing advanced sublimation and premium embroidery techniques.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Delivery",
    description:
      "Rigorous quality control precedes secure, tracked logistics, delivering your custom kits globally, exactly on schedule.",
  },
];

export default function CustomPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    organization: "",
    contactName: "",
    email: "",
    sport: "Soccer / Football",
    quantity: "10 – 49 Units",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.organization || !form.contactName || !form.email) {
      toast.error("Please fill in the required fields");
      return;
    }

    setSubmitted(true);
    toast.success("Quote Request Submitted!", {
      description: "An ASFA Design B2B specialist will contact you within 24 hours.",
    });
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Hero Section ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-neutral-200/90">
        <div className="container-page max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Left: Headline & CTAs */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-3">
                — B2B & BULK ORDERS
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 leading-[1.05] tracking-tight uppercase">
                PRO-GRADE
                <br />
                CUSTOM
                <br />
                TEAMWEAR
              </h1>

              <p className="mt-5 text-xs sm:text-sm leading-relaxed text-neutral-600 max-w-lg font-normal">
                Engineered for elite performance and cohesive identity. Outfit your club, academy,
                or corporate team with precision-manufactured technical apparel designed to dominate
                the pitch.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#quote-form"
                  className="inline-flex items-center justify-center bg-[#047857] hover:bg-[#065F46] text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-xs transition-colors"
                >
                  REQUEST A BULK QUOTE
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-2xs transition-colors"
                >
                  VIEW PROCESS
                </a>
              </div>
            </div>

            {/* Right: Team Showcase Photo */}
            <div className="relative overflow-hidden border border-neutral-300 bg-[#EFEFEF] shadow-soft aspect-[4/3] lg:aspect-[3/4]">
              <img
                src="/assets/jersey-matchday.jpg"
                alt="Pro-grade custom football teamwear and squad matchday apparel"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. The Engineered Process ─────────────────────────── */}
      <section id="process" className="py-14 sm:py-20 bg-white border-b border-neutral-200/90">
        <div className="container-page max-w-6xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase">
              THE ENGINEERED PROCESS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
              From initial concept to final deployment on the field, our structured four-phase
              system ensures absolute precision and quality control for every bulk order.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-6 shadow-2xs transition-all hover:border-neutral-400"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-neutral-400 block mb-4">
                      {step.step}
                    </span>
                    <Icon className="h-5 w-5 text-neutral-900 mb-4" strokeWidth={1.75} />
                    <h3 className="text-sm font-bold text-neutral-900 font-mono">{step.title}</h3>
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03. Levels of Customization ────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-neutral-200/90">
        <div className="container-page max-w-6xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase">
              LEVELS OF CUSTOMIZATION
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-2xl leading-relaxed">
              Select the appropriate technical application for your organization's specific
              performance and aesthetic requirements.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Left Tall Card: Sublimation */}
            <div className="relative overflow-hidden border border-neutral-300 bg-neutral-900 min-h-[380px] lg:min-h-[440px] flex flex-col justify-end p-6 sm:p-8">
              <img
                src="/assets/jersey-custom.jpg"
                alt="Full garment sublimation pattern and micro-mesh graphics"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="inline-block bg-[#047857] px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white shadow-2xs">
                  FULL SUBLIMATION
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                  Basic Sublimation
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
                  Lightweight, integrated graphics that never crack or fade. Ideal for full garment
                  complex patterns and high-friction contact sports where minimizing weight is
                  paramount.
                </p>
              </div>
            </div>

            {/* Right Stacked Cards: Embroidery & Badges */}
            <div className="grid gap-6">
              {/* Top: Premium Embroidery */}
              <div className="relative overflow-hidden border border-neutral-300 bg-neutral-900 min-h-[190px] flex flex-col justify-end p-6">
                <img
                  src="/assets/jersey-printing.jpg"
                  alt="High density embroidery on sports teamwear"
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <h3 className="text-base font-bold text-white">Premium Embroidery</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Tactile, dimensional crests and badges offering a classic, authoritative
                    aesthetic. Recommended for presentation jackets and staff apparel.
                  </p>
                </div>
              </div>

              {/* Bottom: Custom Badges */}
              <div className="relative overflow-hidden border border-neutral-300 bg-neutral-900 min-h-[190px] flex flex-col justify-end p-6">
                <img
                  src="/assets/service-branding.jpg"
                  alt="3D silicone and woven club badges"
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <h3 className="text-base font-bold text-white">Custom Badges</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    High fidelity woven, silicone, or TPU crests applied with heat sealing for
                    ultra-modern, lightweight dimensional finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04. Request a Bulk Quote ───────────────────────────── */}
      <section id="quote-form" className="py-14 sm:py-20 bg-white">
        <div className="container-page max-w-6xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: Quote Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase">
                REQUEST A BULK QUOTE
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Provide your initial requirements below. An ASFA Design B2B specialist will contact
                you within 24 hours to commence the consultation process.
              </p>

              {submitted ? (
                <div className="mt-8 border border-emerald-300 bg-emerald-50/50 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-mono text-sm font-bold">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Quote Request Received!</span>
                  </div>
                  <p className="text-xs text-neutral-700 font-mono leading-relaxed">
                    Thank you, <strong>{form.contactName}</strong>. We have logged your request for{" "}
                    <strong>{form.organization}</strong> ({form.quantity} for {form.sport}). Our
                    team will review your specifications and email you at{" "}
                    <strong>{form.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        organization: "",
                        contactName: "",
                        email: "",
                        sport: "Soccer / Football",
                        quantity: "10 – 49 Units",
                        details: "",
                      });
                    }}
                    className="mt-2 inline-flex items-center text-xs font-mono font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Submit another quote request →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4 font-mono text-xs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                      >
                        ORGANIZATION / TEAM NAME *
                      </label>
                      <input
                        id="organization"
                        type="text"
                        required
                        placeholder="e.g. Metro City FC"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactName"
                        className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                      >
                        CONTACT NAME *
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        required
                        placeholder="Full Name"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                      >
                        WORK EMAIL *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="email@domain.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sport"
                        className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                      >
                        PRIMARY SPORT / ACTIVITY
                      </label>
                      <select
                        id="sport"
                        value={form.sport}
                        onChange={(e) => setForm({ ...form, sport: e.target.value })}
                        className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors"
                      >
                        <option value="Soccer / Football">Soccer / Football</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Running / Athletics">Running / Athletics</option>
                        <option value="Corporate / Other">Corporate / Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                    >
                      ESTIMATED QUANTITY
                    </label>
                    <select
                      id="quantity"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors"
                    >
                      <option value="10 – 49 Units">10 – 49 Units</option>
                      <option value="50 – 99 Units">50 – 99 Units</option>
                      <option value="100 – 249 Units">100 – 249 Units</option>
                      <option value="250+ Units">250+ Units</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="details"
                      className="block text-[10px] font-bold uppercase text-neutral-700 mb-1"
                    >
                      ADDITIONAL DETAILS
                    </label>
                    <textarea
                      id="details"
                      rows={4}
                      placeholder="Describe your specific needs, timelines, or design ideas..."
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-7 shadow-xs transition-colors cursor-pointer"
                    >
                      SUBMIT REQUEST
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Technical Specialist Photo */}
            <div className="relative overflow-hidden border border-neutral-300 bg-[#EFEFEF] shadow-soft min-h-[380px] lg:min-h-full">
              <img
                src="/assets/hero-workspace.jpg"
                alt="ASFA Design apparel specialist reviewing specifications in Dhaka workshop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
