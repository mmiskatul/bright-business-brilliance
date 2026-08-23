import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSetting extends Document {
  businessName: string;
  shortName: string;
  tagline: string;
  intro: string;
  facebookUrl: string;
  facebookHandle: string;
  phone: string;
  email: string;
  location: string;
  responseTime: string;
  hours: Array<{ days: string; time: string }>;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema: Schema = new Schema(
  {
    businessName: { type: String, default: "Arman Graphic Design" },
    shortName: { type: String, default: "Arman" },
    tagline: { type: String, default: "Freelance graphic design for small brands" },
    intro: {
      type: String,
      default:
        "Arman Graphic Design is a one-person studio making clear, confident visuals for small businesses — logos, brand identities, social media creatives and print-ready artwork, delivered file-by-file with revisions until it feels right.",
    },
    facebookUrl: { type: String, default: "https://www.facebook.com/graphicdesigner96Arman" },
    facebookHandle: { type: String, default: "graphicdesigner96Arman" },
    phone: { type: String, default: "+880 1XXX XXXXXX" },
    email: { type: String, default: "hello@armangraphicdesign.com" },
    location: { type: String, default: "Working remotely with clients worldwide" },
    responseTime: { type: String, default: "Messages are usually answered the same day." },
    hours: [
      {
        days: { type: String },
        time: { type: String },
      },
    ],
  },
  { timestamps: true },
);

export const SiteSetting =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);
