"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Truck,
  Loader2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { business } from "@/data/site";
import { products } from "@/data/products";
import { toast } from "sonner";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const prefillJersey = searchParams.get("jersey") || products[0]?.name || "Real Madrid Home Kit";
  const prefillSize = searchParams.get("size") || "M";
  const prefillName = searchParams.get("name") || "";
  const prefillNumber = searchParams.get("number") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    jersey: prefillJersey,
    size: prefillSize,
    customName: prefillName,
    customNumber: prefillNumber,
    quantity: "1",
    deliveryArea: "Inside Dhaka (৳80 Delivery - 24h)",
    message: "",
  });

  useEffect(() => {
    if (prefillJersey) setFormData((f) => ({ ...f, jersey: prefillJersey }));
    if (prefillSize) setFormData((f) => ({ ...f, size: prefillSize }));
    if (prefillName) setFormData((f) => ({ ...f, customName: prefillName }));
    if (prefillNumber) setFormData((f) => ({ ...f, customNumber: prefillNumber }));
  }, [prefillJersey, prefillSize, prefillName, prefillNumber]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setLoading(true);
    try {
      const orderMessage = `[ORDER DETAILS]\nJersey: ${formData.jersey}\nSize: ${formData.size}\nQuantity: ${formData.quantity}\nCustom Print: ${formData.customName ? formData.customName.toUpperCase() : "None"} #${formData.customNumber || ""}\nDelivery Area: ${formData.deliveryArea}\nAddress: ${formData.address}\nNote: ${formData.message || "None"}`;

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || `${formData.phone.replace(/\D/g, "")}@order.asfadesign.com`,
          phone: formData.phone,
          service: formData.jersey,
          budget: `${formData.quantity} piece(s)`,
          timeline: formData.deliveryArea,
          message: orderMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Order Placed Successfully!", {
          description:
            "Saved in MongoDB database. ASFA Design team will call/WhatsApp for confirmation.",
        });
      } else {
        throw new Error(data.message || "Failed to submit order");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Could not place order online. Please order via WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Direct Orders & Custom Inquiries
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Order Your Jersey or Contact Our Dhaka Studio
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Submit your order details below or chat with us on WhatsApp for instant sizing
            assistance, custom name printing, and same-day delivery dispatch.
          </p>
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Order & Contact Form */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-soft">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mb-4">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Order Received in MongoDB!</h2>
                <p className="mt-3 text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Your order for{" "}
                  <strong>
                    {formData.jersey} ({formData.size})
                  </strong>{" "}
                  has been securely logged. Our team will contact your phone ({formData.phone}) to
                  confirm delivery dispatch.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <a
                    href={`https://wa.me/8801711234567?text=Hi%20ASFA%20Design!%20I%20just%20placed%20an%20order%20for%20${encodeURIComponent(formData.jersey)}%20(Name:%20${encodeURIComponent(formData.name)})`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Confirm on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        jersey: products[0]?.name || "Real Madrid Home Kit",
                        size: "M",
                        customName: "",
                        customNumber: "",
                        quantity: "1",
                        deliveryArea: "Inside Dhaka (৳80 Delivery - 24h)",
                        message: "",
                      });
                    }}
                    className="rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-50"
                  >
                    Place Another Order
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Online Jersey Order Form</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Cash on Delivery available nationwide across Bangladesh.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="tanvir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">
                      Delivery Location *
                    </label>
                    <select
                      value={formData.deliveryArea}
                      onChange={(e) => setFormData({ ...formData, deliveryArea: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      <option value="Inside Dhaka (৳80 Delivery - 24h)">
                        Inside Dhaka (৳80 Delivery - 24h)
                      </option>
                      <option value="Outside Dhaka / All Districts (৳130 - 48-72h)">
                        Outside Dhaka / All Districts (৳130 - 48-72h)
                      </option>
                      <option value="Showroom Pickup (Dhanmondi, Dhaka)">
                        Showroom Pickup (Dhanmondi, Dhaka)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Full Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Apartment #, Road #, Sector/Area, City/Thana"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Jersey Selection Details */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-neutral-800 mb-1">
                        Select Jersey
                      </label>
                      <select
                        value={formData.jersey}
                        onChange={(e) => setFormData({ ...formData, jersey: e.target.value })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        {products.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name} — {p.price}
                          </option>
                        ))}
                        <option value="Custom Sublimation Batch">
                          Custom Sublimation Team Batch
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-800 mb-1">Size</label>
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        <option value="S">S (Chest 38")</option>
                        <option value="M">M (Chest 40")</option>
                        <option value="L">L (Chest 42")</option>
                        <option value="XL">XL (Chest 44")</option>
                        <option value="XXL">XXL (Chest 46")</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                        Custom Player Name (Free)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BELLINGHAM or YOUR NAME"
                        value={formData.customName}
                        onChange={(e) =>
                          setFormData({ ...formData, customName: e.target.value.toUpperCase() })
                        }
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-xs font-bold uppercase text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                        Squad Number (Free)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 5, 10, 7"
                        maxLength={3}
                        value={formData.customNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customNumber: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-xs font-bold text-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Special Instructions / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific sleeve patches, tournament badge preferences, or delivery timing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-3.5 px-8 text-xs font-bold text-white shadow-soft hover:bg-emerald-800 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting Order to MongoDB...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Place Order (Cash on Delivery)
                      </>
                    )}
                  </button>

                  <a
                    href={business.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Order
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Studio Information & Location */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-soft">
              <h2 className="text-lg font-bold text-neutral-900">ASFA Design Studio</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Visit our Dhanmondi showroom or get direct assistance.
              </p>

              <ul className="mt-6 space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-neutral-900">Showroom & Workshop</p>
                    <p className="text-neutral-600 mt-0.5">{business.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-neutral-900">Hotline & WhatsApp</p>
                    <a
                      href={business.phoneHref}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {business.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-neutral-900">Email Inquiries</p>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-neutral-600 hover:underline"
                    >
                      {business.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-neutral-900">Operating Hours</p>
                    <div className="text-neutral-600 space-y-0.5 mt-0.5">
                      {business.hours.map((h) => (
                        <div key={h.days} className="flex justify-between gap-4">
                          <span>{h.days}:</span>
                          <span>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Truck className="h-4 w-4 text-emerald-700" />
                Nationwide Delivery Guarantee
              </div>
              <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                All packages are wrapped in waterproof dust-shield bags with tracking codes provided
                upon dispatch. Cash on Delivery is available in all 64 districts of Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-sm">Loading Order Form...</div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
