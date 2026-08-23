import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  slug: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  summary: string;
  description: string;
  details: string[];
  fabric: string;
  sizes: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    originalPrice: { type: String },
    badge: { type: String },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: [String], default: [] },
    fabric: { type: String, default: "100% Breathable Jacquard Micro-Polyester" },
    sizes: { type: [String], default: ["S", "M", "L", "XL", "XXL"] },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    featured: { type: Boolean, default: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
