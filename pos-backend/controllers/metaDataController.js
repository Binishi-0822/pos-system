import Measurement from "../models/Measurement.js";
import ProductCategory from "../models/ProductCategory.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllMeasurement = async (req, res) => {
  try {
    const measurements = await Measurement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: measurements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};