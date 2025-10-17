import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Measurement from "../models/Measurement.js";

export const addProduct = async (req, res) => {
  try {
    console.log("addProduct");

    const { name, category, unit, minStock } = req.body;

    // Validate category and unit existence
    const existingCategory = await ProductCategory.findById(category);
    const existingUnit = await Measurement.findById(unit);

    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    if (!existingUnit) {
      return res.status(400).json({ message: "Invalid unit ID" });
    }

    // Map correctly to schema field names
    const newProduct = new Product({
      name,
      categoryId: category,
      unitId: unit,
      minStock,
      totalStock: 0, // default
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("unitId", "symbol")
      .sort({ createdAt: -1 }); 

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};