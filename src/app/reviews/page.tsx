"use client";

import { useState } from "react";
import { Star, CheckCircle, MessageSquare, Send, Loader2, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { ButtonLink } from "@/components/site/Button";
import { reviews as initialReviews, type Review } from "@/data/reviews";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("Real Madrid Home Kit");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      toast.error("Please provide your name and review message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, product, rating, comment }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Review submitted successfully!", {
          description: "Thank you for supporting ASFA Design!",
        });
        setReviewsList((prev) => [data.data, ...prev]);
        setName("");
        setLocation("");
        setComment("");
      } else {
        throw new Error(data.message || "Failed to submit review");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Section tone="surface">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Customer Feedback & Ratings
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            Verified Customer Reviews
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Read real experiences from football fans, captains, and kit collectors across Dhaka,
            Chittagong, Sylhet, and all 64 districts in Bangladesh.
          </p>

          {/* Overall Rating Pill */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-border bg-neutral-50 px-5 py-3 shadow-sm">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-neutral-900">5.0 / 5.0 Rating</span>
            <span className="text-xs text-muted-foreground">• 1,400+ Facebook Community</span>
          </div>
        </div>
      </Section>

      <Section tone="alt" bordered>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Reviews Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {reviewsList.map((r) => (
              <div
                key={r.id || r.name + r.date}
                className="rounded-2xl border border-border/80 bg-white p-6 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-500">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{r.date}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-neutral-700 italic">"{r.comment}"</p>

                  <div className="mt-4 inline-block rounded bg-neutral-50 px-2 py-1 text-[11px] font-semibold text-neutral-600 border border-border/60">
                    Jersey: {r.product}
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 font-bold text-xs text-emerald-900">
                      {r.avatarText || r.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">{r.location}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a Review Form */}
          <div>
            <div className="sticky top-28 rounded-2xl border border-border bg-white p-7 shadow-soft">
              <div className="flex items-center gap-2 text-emerald-800 mb-2">
                <Sparkles className="h-4 w-4 text-emerald-700" />
                <h3 className="text-lg font-bold text-neutral-900">Share Your Experience</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Bought a jersey from ASFA Design? Leave your rating and feedback below.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Location (e.g. Dhanmondi, Dhaka)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Uttara, Dhaka"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Jersey Purchased
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Real Madrid Home Kit"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold border ${
                          rating === num
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : "border-border bg-neutral-50 text-neutral-700"
                        }`}
                      >
                        {num} ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the fabric quality, stitching, sizing, and delivery..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publishing to MongoDB...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
