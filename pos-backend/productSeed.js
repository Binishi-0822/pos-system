import mongoose from "mongoose";
import ProductCategory from "./models/ProductCategory.js"; 
import connectToDatabase from "./db/db.js"; 
import dotenv from "dotenv";
dotenv.config();

const productCategories = [
  // Packaged Foods
  { name: "Bakery" },
  { name: "Biscuits" },
  { name: "Chocolates" },
  { name: "Dairy" },
  { name: "Ice Cream" },
  { name: "Snacks" },

  // Beverages
  { name: "Beverages" },

  // Fresh Items
  { name: "Fruits" },
  { name: "Vegetables" },

  // Groceries & Essentials
  { name: "Groceries" },

  // Health & Medicine
  { name: "Health & Medicine" },

  // Personal Care
  { name: "Personal Care" },

  // Household & Cleaning
  { name: "Household & Cleaning" },

  // Hardware & Miscellaneous
  { name: "Hardware & Miscellaneous" },

  // Baby & Stationery
  { name: "Baby Care" },
  { name: "Stationery" },

  // Fallback
  { name: "Other" },
];

const seedProductCategories = async () => {
  try {
    await connectToDatabase(); // connect to your DB

    // Optional: Clear existing categories before seeding
    await ProductCategory.deleteMany({});

    // Insert all categories
    await ProductCategory.insertMany(productCategories);

    console.log("Product categories seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding product categories:", error);
    mongoose.connection.close();
  }
};

seedProductCategories();
