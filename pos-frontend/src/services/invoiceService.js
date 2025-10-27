import axios from 'axios';

const API_URL = "http://localhost:3000/api/invoice";

export const addInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/create-invoice`, invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export const getAllInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-invoices`);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};