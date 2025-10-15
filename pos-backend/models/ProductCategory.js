import mongoose, { mongo } from "mongoose";

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const ProductCategory = mongoose.model("ProductCategory",productCategorySchema)

export default ProductCategory