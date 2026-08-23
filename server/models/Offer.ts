import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  badge: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  validUntil: string;
  terms: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    discount: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    description: { type: String, required: true },
    validUntil: { type: String, default: "Limited time" },
    terms: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Offer = mongoose.models.Offer || mongoose.model<IOffer>("Offer", OfferSchema);
