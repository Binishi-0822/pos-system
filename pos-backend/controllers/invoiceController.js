import Invoice from "../models/Invoice.js";
import ProductBatch from "../models/ProductBatch.js";
import Product from "../models/Product.js";
import convertToISO from "../utils/dateUtils.js";

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


export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_name, invoice_number, invoice_date, products } = req.body;
    console.log(id,supplier_name, invoice_number, invoice_date, products )

    // Validate input
    if (!supplier_name || !invoice_date || !products?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find the existing invoice
    const existingInvoice = await Invoice.findById(id).populate({
      path: "items.batch_id",
      model: "ProductBatch",
    });

    console.log("existingInvoice : ",existingInvoice)

    if (!existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // 🧹 Step 1: Revert old stock changes
    if (existingInvoice.items && existingInvoice.items.length > 0) {
        for (const item of existingInvoice.items) {
            if (item.batch_id) {
                console.log("item.batch_id : ",item.batch_id)
                const oldBatch = await ProductBatch.findById(item.batch_id);
                console.log("oldBatch : ",oldBatch)
                if (oldBatch) {
                    const product = await Product.findById(oldBatch.product_id);
                    console.log("product : ",product)
                    if (product) {
                    product.totalStock -= oldBatch.quantity; // revert previous stock
                    await product.save();
                    }
                    await ProductBatch.findByIdAndDelete(oldBatch._id); // safer delete
                }
            }
        }
    }

    // 🧾 Step 2: Create and save new batches
    const newBatches = await Promise.all(
      products.map(async (p) => {
        const product = await Product.findById(p.product_id);
        if (!product) throw new Error("Product not found");

        // increment stock
        product.totalStock += p.quantity;
        await product.save();

        const newBatch = new ProductBatch({
          product_id: p.product_id,
          purchase_price: p.purchase_price,
          selling_price: p.selling_price,
          quantity: p.quantity,
          expire_date: convertToISO(p.expire_date),
        });
        return await newBatch.save();
      })
    );

    // Step 3: Recalculate totals
    const totalAmount = newBatches.reduce(
      (sum, batch, index) =>
        sum + products[index].purchase_price * products[index].quantity,
      0
    );

    // 🧾 Step 4: Update invoice
    existingInvoice.supplier_name = supplier_name;
    existingInvoice.invoice_number = invoice_number;
    existingInvoice.invoice_date = invoice_date;
    existingInvoice.items = newBatches.map((batch) => ({ batch_id: batch._id }));
    existingInvoice.total_items = newBatches.length;
    existingInvoice.total_amount = totalAmount;

    const updatedInvoice = await existingInvoice.save();

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update invoice",
      error: error.message,
    });
  }
};
