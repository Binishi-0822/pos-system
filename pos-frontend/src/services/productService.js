import axios from 'axios';

const API_URL = "http://localhost:3000/api/product";

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/add-product`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (productData) => {
  try {
    console.log("ProductData : ",productData)
    const response = await axios.post(`${API_URL}/update-product`,productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProduct = async (product_id) => {
  try {
    const response = await axios.post(`${API_URL}/delete-product`, { id: product_id });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-products`);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getInventorySummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-inventory-summary`);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
