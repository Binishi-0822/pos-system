import mongoose from "mongoose";
import dotenv from "dotenv";
import Measurement from "./models/Measurement.js";
import connectToDatabase from "./db/db.js";

dotenv.config();

const groceryMeasurements = [
  { name: "Kilogram", symbol: "kg" },
  { name: "Gram", symbol: "g" },
  { name: "Liter", symbol: "L" },
  { name: "Milliliter", symbol: "mL" },
  { name: "Piece", symbol: "pcs" },
  { name: "Pack", symbol: "pack" },
  { name: "Box", symbol: "box" },
  { name: "Bottle", symbol: "bottle" },
  { name: "Dozen", symbol: "dz" },
  { name: "Bag", symbol: "bag" },
  { name: "Packet", symbol: "pkt" },
  { name: "Tray", symbol: "tray" },
];

const seedMeasurements = async () => {
  try {
    await connectToDatabase();
    await Measurement.deleteMany({});
    await Measurement.insertMany(groceryMeasurements);

    console.log("Grocery measurements seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedMeasurements();
