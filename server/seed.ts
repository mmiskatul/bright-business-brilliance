import { connectDB } from "./db";
import { Product } from "./models/Product";
import { Review } from "./models/Review";
import { Offer } from "./models/Offer";
import { GalleryItem } from "./models/GalleryItem";
import { SiteSetting } from "./models/SiteSetting";
import {
  defaultProducts,
  defaultReviews,
  defaultOffers,
  defaultSiteSetting,
} from "./data/defaultData";
import { defaultGallery } from "./data/defaultData";
import mongoose from "mongoose";

export async function seedDatabase(force = false) {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.log("[Seeder] MongoDB not reachable. Skipping auto-seeding.");
      return;
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0 || force) {
      if (force) await Product.deleteMany({});
      await Product.insertMany(defaultProducts);
      console.log(`[Seeder] Seeded ${defaultProducts.length} ASFA jerseys to MongoDB.`);
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0 || force) {
      if (force) await Review.deleteMany({});
      await Review.insertMany(defaultReviews);
      console.log(`[Seeder] Seeded ${defaultReviews.length} verified reviews to MongoDB.`);
    }

    const offerCount = await Offer.countDocuments();
    if (offerCount === 0 || force) {
      if (force) await Offer.deleteMany({});
      await Offer.insertMany(defaultOffers);
      console.log(`[Seeder] Seeded ${defaultOffers.length} offers to MongoDB.`);
    }

    const settingCount = await SiteSetting.countDocuments();
    if (settingCount === 0 || force) {
      if (force) await SiteSetting.deleteMany({});
      await SiteSetting.create(defaultSiteSetting);
      console.log("[Seeder] Seeded ASFA Design site settings to MongoDB.");
    }
  } catch (err) {
    console.error("[Seeder] Error seeding database:", err);
  }
}

if (process.argv[1]?.includes("seed.ts")) {
  seedDatabase(true).then(() => {
    console.log("[Seeder] Database seeding process completed.");
    mongoose.disconnect();
    process.exit(0);
  });
}
