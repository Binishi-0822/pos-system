import Invoice from "../models/Invoice.js";
import ProductBatch from "../models/ProductBatch.js";
import Product from "../models/Product.js";

export const createInvoice = async (req, res) => {
  try {
    const { supplier_name, invoice_number, invoice_date, products } = req.body;

    // Basic validation
    if (!supplier_name || !invoice_date || !products?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //  Create and save product batches first
    const savedBatches = await Promise.all(
      products.map(async (p) => {
        const product = await Product.findById(p.product_id);
        if (!product) throw new Error("Product not found");

        // Increment stock
        product.totalStock = product.totalStock + p.quantity;
        await product.save(); 
        
        const newBatch = new ProductBatch({
          product_id: p.product_id,
          purchase_price: p.purchase_price,
          selling_price: p.selling_price,
          quantity: p.quantity,
          expire_date: p.expire_date,
        });
        return await newBatch.save();
      })
    );

    // Prepare invoice with references to saved batches
    const invoice = new Invoice({
      supplier_name,
      invoice_number,
      invoice_date,
      items: savedBatches.map((batch) => ({
        batch_id: batch._id,
      })),
      total_items: savedBatches.length,
      total_amount: savedBatches.reduce(
        (sum, batch, index) =>
          sum + products[index].purchase_price * products[index].quantity,
        0
      ),
    });

    const savedInvoice = await invoice.save();

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: savedInvoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating invoice",
    });
  }
};


export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate({
        path: "items.batch_id",
        model: "ProductBatch",
        populate: {
          path: "product_id",
          model: "Product",
          populate: { 
            path: "categoryId", 
            model: "ProductCategory",
            select: "name"
          }
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: invoices }); // send response
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ success: false, message: "Failed to fetch invoices", error: error.message });
  }
};
