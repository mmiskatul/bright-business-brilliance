import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  details: string[];
  price?: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: [String], default: [] },
    price: { type: String, default: "Quoted per project" },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
