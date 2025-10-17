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


export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-products`);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};