import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },


    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ProductCategory", 
      required: true 
    },

    unitId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Measurement", 
      required: true 
    },

    minStock: { 
      type: Number, 
      required: true, 
      min: 0 
    },

    totalStock: { 
      type: Number, 
      default: 0, 
      min: 0 
    },

    status: {
      type: String,
      enum: ["in_stock", "low_stock", "out_of_stock"],
      default: "out_of_stock",
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  if (this.totalStock <= 0) {
    this.status = "out_of_stock";
  } else if (this.totalStock <= this.minStock) {
    this.status = "low_stock";
  } else {
    this.status = "in_stock";
  }
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
