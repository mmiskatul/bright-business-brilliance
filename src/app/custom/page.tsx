"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageSquare, PenTool, Layers, Truck, CheckCircle2 } from "lucide-react";
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
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
    toast.success("Quote Request Submitted!", {
      description: "An ASFA Design B2B specialist will contact you within 24 hours.",
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* ─── SECTION 1: HERO ────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-24 border-b border-neutral-100">
        <div className="container-page max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                — B2B &amp; BULK ORDERS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-neutral-900 leading-[1.08] tracking-tight uppercase">
                PRO-GRADE
                <br />
                CUSTOM
                <br />
                TEAMWEAR
              </h1>

              <p className="mt-6 max-w-lg text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                Engineered for elite performance and cohesive identity. Outfit your club, academy,
                or corporate team with precision-manufactured technical apparel designed to dominate
                the pitch.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => scrollToSection("quote-form")}
                  className="inline-flex items-center justify-center bg-[#047857] hover:bg-[#065f46] text-white font-mono text-[11px] font-bold uppercase tracking-wider py-3.5 px-6 shadow-2xs transition-colors cursor-pointer"
                >
                  REQUEST A BULK QUOTE
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("process")}
                  className="inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-mono text-[11px] font-bold uppercase tracking-wider py-3.5 px-6 shadow-2xs transition-colors cursor-pointer"
                >
                  VIEW PROCESS
                </button>
              </div>
            </div>

            {/* Right: Pro Squad Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
              <img
                src="/assets/jersey-hero.jpg"
                alt="ASFA Design professional athletes in custom pro-grade teamwear"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE ENGINEERED PROCESS ─────────────────── */}
      <section
        id="process"
        className="py-16 sm:py-20 lg:py-24 border-b border-neutral-100 bg-white"
      >
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
            {processSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="flex flex-col justify-between border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-2xs"
                >
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block mb-4">
                      {item.step}
                    </span>
                    <div className="text-neutral-900 mb-4">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 tracking-tight mb-2">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: LEVELS OF CUSTOMIZATION ─────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-neutral-100 bg-white">
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

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {/* Left Big Card: Basic Sublimation */}
            <div className="relative overflow-hidden border border-neutral-200 bg-neutral-900 lg:col-span-7 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 group">
              <img
                src="/assets/jersey-custom.jpg"
                alt="Basic Sublimation Fabric Detail"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-85 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10">
                <span className="inline-block rounded bg-emerald-600/90 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-white mb-2.5">
                  BASE TIER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Basic Sublimation
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
                  Lightweight, integrated graphics that never crack or fade. Ideal for full-garment
                  complex patterns and high-friction contact sports where minimizing weight is
                  paramount.
                </p>
              </div>
            </div>

            {/* Right Column: 2 Stacked Cards */}
            <div className="grid gap-6 lg:col-span-5">
              {/* Right Top Card: Premium Embroidery */}
              <div className="relative overflow-hidden border border-neutral-200 bg-neutral-900 min-h-[200px] flex flex-col justify-end p-6 group">
                <img
                  src="/assets/jersey-printing.jpg"
                  alt="Premium Embroidery Machinery"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Premium Embroidery
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                    Tactile, dimensional crests and logos offering a classic, authoritative
                    aesthetic. Recommended for presentation jackets and staff apparel.
                  </p>
                </div>
              </div>

              {/* Right Bottom Card: Custom Badges */}
              <div className="relative overflow-hidden border border-neutral-200 bg-neutral-900 min-h-[200px] flex flex-col justify-end p-6 group">
                <img
                  src="/assets/service-branding.jpg"
                  alt="Custom Silicone and TPU Badges Collection"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Custom Badges
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                    High-fidelity woven, silicone, or TPU crests applied with heat sealing for an
                    ultra-modern, lightweight dimensional finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: REQUEST A BULK QUOTE ────────────────────── */}
      <section id="quote-form" className="py-16 sm:py-20 lg:py-24 bg-[#EFEFEF]">
        <div className="container-page max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 bg-white border border-neutral-300 shadow-soft overflow-hidden">
            {/* Left: Form */}
            <div className="p-8 sm:p-10 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight uppercase">
                REQUEST A BULK QUOTE
              </h2>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                Provide your initial requirements below. An ASFA Design B2B specialist will contact
                you within 24 hours to commence the consultation process.
              </p>

              {submitted ? (
                <div className="mt-8 border border-emerald-300 bg-emerald-50/80 p-6 text-emerald-900">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Inquiry Received</span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-700 leading-relaxed font-mono">
                    Thank you, <strong>{form.contactName}</strong>. Our manufacturing team for{" "}
                    <strong>{form.organization}</strong> will email you at{" "}
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
                    className="mt-4 inline-flex items-center text-xs font-mono font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Submit another quote request →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4 font-mono text-xs">
                  {/* Row 1: Org & Contact */}
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

                  {/* Row 2: Email & Sport */}
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
                        className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Soccer / Football">Soccer / Football</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Running / Athletics">Running / Athletics</option>
                        <option value="Corporate / Other">Corporate / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Quantity */}
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
                      className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2.5 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="10 – 49 Units">10 – 49 Units</option>
                      <option value="50 – 99 Units">50 – 99 Units</option>
                      <option value="100 – 249 Units">100 – 249 Units</option>
                      <option value="250+ Units">250+ Units</option>
                    </select>
                  </div>

                  {/* Row 4: Details */}
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

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-8 shadow-xs transition-colors cursor-pointer"
                    >
                      SUBMIT REQUEST
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Technical Specialist Photo */}
            <div className="relative overflow-hidden bg-neutral-200 min-h-[360px] lg:min-h-full">
              <img
                src="/assets/hero-workspace.jpg"
                alt="ASFA Design apparel specialist reviewing specifications in Dhaka workshop"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
