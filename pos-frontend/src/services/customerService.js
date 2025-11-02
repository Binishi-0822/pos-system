import axios from "axios";

const API_URL = "/api/customer";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCustomer = async (customerData) => {
  const response = await api.post("/add-customer", customerData);
  return response.data;
};

export const updateCustomer = async (customerData) => {
  const response = await api.post("/update-customer", customerData);
  return response.data;
};

export const getCustomers = async () => {
  const response = await api.get("/get-customers");
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await api.get(`/get-customer/${id}`);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.post("/delete-customer", { id });
  return response.data;
};
