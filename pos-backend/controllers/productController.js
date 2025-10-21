import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Measurement from "../models/Measurement.js";

export const addProduct = async (req, res) => {
  try {
    console.log("addProduct");

    const { name, brand, category, unit, minStock } = req.body;

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
      brand,
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

export const updateProduct = async (req, res) => {
  try {
    const { _id, name, brand, category, unit, minStock } = req.body;

    if (!_id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, category, unit, minStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
