import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  avatarText: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 5 },
    date: { type: String, default: () => new Date().toLocaleDateString() },
    product: { type: String, default: "Custom Matchday Jersey" },
    comment: { type: String, required: true },
    avatarText: { type: String, default: "A" },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
