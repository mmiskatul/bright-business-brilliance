import mongoose, { Schema, Document } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  imageAlt: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    client: { type: String, default: "Client Project" },
    year: { type: String, default: () => new Date().getFullYear().toString() },
    image: { type: String, required: true },
    imageAlt: { type: String, required: true },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const GalleryItem =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);
