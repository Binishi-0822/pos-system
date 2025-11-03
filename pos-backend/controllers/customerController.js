import Customer from "../models/Customer.js";
import { sendAccountCreationWhatsApp } from "../config/twilio.js";


// ✅ Helper: validate basic fields
const validateCustomer = (data) => {
  const { name, address, phone } = data;
  if (!name || name.trim().length < 2) return "Name is required and must be at least 2 characters.";
  if (!address || address.trim().length < 5) return "Address is required and must be at least 5 characters.";
  if (!phone || !/^\d{10}$/.test(phone)) return "Phone must be a valid 10-digit number.";
  return null;
};

export const createCustomer = async (req, res) => {
  try {
    const error = validateCustomer(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const { name, address, phone } = req.body;

    // Check duplicate phone
    const existing = await Customer.findOne({ phone });
    if (existing)
      return res.status(400).json({ success: false, message: "Customer with this phone already exists." });

    const customer = await Customer.create({ name, address, phone });
    await sendAccountCreationWhatsApp(phone, name);


    res.status(201).json({ success: true, data: customer, message: "Customer created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ success: false, message: "Customer not found" });
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { name, address, phone, status } = req.body;

    // Validate if fields are provided
    if (name || address || phone) {
      const error = validateCustomer({ name: name || "xx", address: address || "xxxxx", phone: phone || "0000000000" });
      if (error) return res.status(400).json({ success: false, message: error });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, address, phone, status, lastActiveAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!customer)
      return res.status(404).json({ success: false, message: "Customer not found" });

    res.status(200).json({ success: true, message: "Customer updated successfully", data: customer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res.status(404).json({ success: false, message: "Customer not found" });

    res.status(200).json({ success: true, message: "Customer deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
