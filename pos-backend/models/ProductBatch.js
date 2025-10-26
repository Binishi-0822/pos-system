import mongoose, { mongo } from "mongoose";

const batchSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  purchase_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  expire_date: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const ProductBatch = mongoose.model("ProductBatch", batchSchema);
export default ProductBatch;
