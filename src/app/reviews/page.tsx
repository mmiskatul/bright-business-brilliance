"use client";

import { useState } from "react";
import { Star, CheckCircle2, ChevronDown, Plus, X } from "lucide-react";
import { toast } from "sonner";

interface ReviewItem {
  id: string;
  title: string;
  rating: number;
  date: string;
  comment: string;
  name: string;
  initials: string;
  verifiedLabel: string;
  image?: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    title: "Unmatched Breathability",
    rating: 5,
    date: "Oct 12, 2023",
    comment:
      "The Pro-Core training kit holds up perfectly during intense two-a-days. The fabric wicks moisture instantly and doesn't cling. Definitely outshines my previous gear from bigger brands.",
    name: "Marcus K.",
    initials: "MK",
    verifiedLabel: "Verified Buyer",
  },
  {
    id: "rev-2",
    title: "Perfect Team Kit",
    rating: 5,
    date: "Sep 28, 2023",
    comment:
      "Ordered custom kits for our entire club. The ordering process was seamless, and the quality is pro-level. The stitching is durable and the kinetic green accents really pop on the pitch. Highly recommend for serious teams.",
    name: "Sarah J.",
    initials: "SJ",
    verifiedLabel: "Verified Team Order",
    image: "/assets/jersey-matchday.jpg",
  },
  {
    id: "rev-3",
    title: "Durable and Lightweight",
    rating: 5,
    date: "Oct 05, 2023",
    comment:
      "I've washed these shorts at least 30 times and they look brand new. The material is so light you barely notice it, but it feels incredibly strong. Fits true to size.",
    name: "David T.",
    initials: "DT",
    verifiedLabel: "Verified Buyer",
  },
  {
    id: "rev-4",
    title: "Master Quality Dhaka Sublimation",
    rating: 5,
    date: "Sep 15, 2023",
    comment:
      "The Japanese dye sublimation on our custom tournament kit is razor sharp. No peeling or bleeding after 10 matchdays. Best apparel studio in Bangladesh.",
    name: "Tanvir A.",
    initials: "TA",
    verifiedLabel: "Verified Captain",
  },
  {
    id: "rev-5",
    title: "Messi Tribute Back Art is Incredible",
    rating: 5,
    date: "Aug 22, 2023",
    comment:
      "The polo pique fabric has authentic luxury weight and the embroidery of the 3-star laurel wreath crest is pristine. Worth every single taka.",
    name: "Rahim S.",
    initials: "RS",
    verifiedLabel: "Verified Buyer",
  },
  {
    id: "rev-6",
    title: "Fast 24h Delivery in Dhanmondi",
    rating: 5,
    date: "Aug 10, 2023",
    comment:
      "Ordered on Tuesday morning and had the jersey in hand by Wednesday afternoon. Name printing was aligned perfectly. Will order again!",
    name: "Nafis H.",
    initials: "NH",
    verifiedLabel: "Verified Buyer",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [displayCount, setDisplayCount] = useState<number>(3);
  const [sortOrder, setSortOrder] = useState<string>("Most Recent");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formRating, setFormRating] = useState(5);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formComment) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      title: formTitle || "Outstanding Quality & Matchday Fit",
      rating: formRating,
      date: "Just now",
      comment: formComment,
      name: formName,
      initials: formName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      verifiedLabel: "Verified Athlete",
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setFormName("");
    setFormTitle("");
    setFormComment("");

    toast.success("Review Submitted Successfully!", {
      description: "Thank you for sharing your stats with ASFA Design.",
    });
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* ─── Hero Header & Rating Breakdown ─────────────────────── */}
      <section className="py-14 sm:py-20 border-b border-neutral-200/90 text-center">
        <div className="container-page max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-neutral-900 leading-tight">
            WHAT THE SQUAD SAYS:
            <br />
            <span className="text-[#047857]">PERFORMANCE VERIFIED</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Don't just take our word for it. See how ASFA Design gear performs on the pitch, court,
            and track, backed by thousands of athletes worldwide.
          </p>

          {/* Score Box Card */}
          <div className="mt-10 mx-auto max-w-lg border border-neutral-200 bg-[#F8F9F7] p-6 sm:p-7 shadow-2xs text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            {/* Left: Overall Score */}
            <div className="text-center sm:text-left shrink-0">
              <div className="flex items-baseline justify-center sm:justify-start gap-1">
                <span className="text-4xl sm:text-5xl font-black text-neutral-900 font-mono">
                  4.9
                </span>
                <span className="text-sm font-mono text-neutral-500 font-bold">/5</span>
              </div>

              {/* 5 Green Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#047857] mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <span className="block text-[10px] font-mono text-neutral-500 font-medium mt-2">
                Based on 2,000+ Reviews
              </span>
            </div>

            {/* Right: Dimension Bars */}
            <div className="w-full sm:w-60 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="w-14 text-[11px] font-bold text-neutral-700">Fit</span>
                <div className="flex-1 h-2 bg-neutral-200 overflow-hidden">
                  <div className="h-full bg-black" style={{ width: "96%" }} />
                </div>
                <span className="text-[11px] font-bold text-neutral-900">4.8</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-14 text-[11px] font-bold text-neutral-700">Quality</span>
                <div className="flex-1 h-2 bg-neutral-200 overflow-hidden">
                  <div className="h-full bg-black" style={{ width: "98%" }} />
                </div>
                <span className="text-[11px] font-bold text-neutral-900">4.9</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-14 text-[11px] font-bold text-neutral-700">Value</span>
                <div className="flex-1 h-2 bg-neutral-200 overflow-hidden">
                  <div className="h-full bg-black" style={{ width: "92%" }} />
                </div>
                <span className="text-[11px] font-bold text-neutral-900">4.6</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Athlete Reviews Grid ───────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-b border-neutral-200/90">
        <div className="container-page max-w-6xl">
          {/* Header Row with Sort Dropdown */}
          <div className="flex items-center justify-between pb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 tracking-tight">
              ATHLETE REVIEWS
            </h2>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none border border-neutral-300 bg-white px-3.5 py-1.5 pr-8 text-xs font-mono font-medium text-neutral-800 outline-none hover:border-neutral-500 cursor-pointer transition-colors"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Highest Rated">Highest Rated</option>
                <option value="Team Orders">Team Orders</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
            </div>
          </div>

          {/* 3-Column Reviews Card Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.slice(0, displayCount).map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between border border-neutral-300 bg-white shadow-2xs overflow-hidden"
              >
                {/* Optional Photo Attachment */}
                {rev.image && (
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                    <img src={rev.image} alt={rev.title} className="h-full w-full object-cover" />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Stars & Date Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-[#047857]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-medium">
                        {rev.date}
                      </span>
                    </div>

                    {/* Review Title */}
                    <h3 className="mt-3 text-sm font-bold text-neutral-900 leading-snug">
                      {rev.title}
                    </h3>

                    {/* Review Body */}
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author / Verification Footer */}
                  <div className="mt-6 border-t border-neutral-200/80 pt-4 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center bg-neutral-100 font-mono text-[10px] font-bold text-neutral-700 uppercase">
                      {rev.initials}
                    </div>
                    <div className="text-[11px] font-mono">
                      <p className="font-bold text-neutral-900 leading-tight">{rev.name}</p>
                      <p className="text-[10px] text-neutral-500 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5 text-neutral-400" />
                        {rev.verifiedLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < reviews.length && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setDisplayCount((c) => Math.min(c + 3, reviews.length))}
                className="inline-flex items-center justify-center border border-neutral-300 bg-white hover:bg-neutral-50 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-2xs transition-colors cursor-pointer"
              >
                LOAD MORE REVIEWS
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Bottom Callout: Share Your Stats ───────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F4F5F4] text-center">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-neutral-900 tracking-tight">
            SHARE YOUR STATS
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Got a new PR? Won the league? Show us how you perform in ASFA Design gear and leave a
            review to help the squad grow.
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#047857] hover:bg-[#065F46] text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-xs transition-colors cursor-pointer"
            >
              SUBMIT A REVIEW →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Review Modal ───────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg border border-neutral-300 bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-black uppercase text-neutral-900 font-mono">
              Submit Your Review
            </h3>
            <p className="mt-1 text-xs text-neutral-500 font-mono">
              Share your matchday experience with ASFA Design gear.
            </p>

            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                  HEADLINE / TITLE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Unmatched Breathability & Quality"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                  RATING
                </label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormRating(r)}
                      className={`flex-1 py-1.5 text-xs font-bold border ${
                        formRating === r
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500"
                      }`}
                    >
                      {r} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                  REVIEW COMMENTS *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How did the jersey fit and perform on the pitch?"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full border border-neutral-300 bg-[#FAFAF8] px-3.5 py-2 text-xs text-neutral-900 outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-neutral-300 bg-white px-4 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#047857] hover:bg-[#065F46] text-white px-5 py-2 text-xs font-bold uppercase"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
