import axios from 'axios';

const API_URL = "http://localhost:3000/api/product";

export const addProduct = async (productData) => {
  try {
    console.log("Add product : ",productData)
    const response = await axios.post(`${API_URL}/add-product`, productData);
    console.log("************************************* ",response)

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
