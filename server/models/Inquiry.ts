import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: "new" | "in_review" | "contacted" | "completed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    service: { type: String, default: "General Inquiry" },
    budget: { type: String, default: "" },
    timeline: { type: String, default: "" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_review", "contacted", "completed", "archived"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Inquiry =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
