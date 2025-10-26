import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    supplier_name: { type: String, required: true },
    invoice_number: { type: String },
    invoice_date: { type: Date, required: true },

    // Each item in the invoice points to a batch
    items: [
      {
        batch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
        // quantity: { type: Number, required: true }, // how much sold from this batch
        // subtotal: { type: Number, required: true }, // purchase_price * quantity or selling_price * quantity
      }
    ],

    total_items: { type: Number, required: true },
    total_amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
