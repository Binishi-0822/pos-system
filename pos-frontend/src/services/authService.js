import axios from 'axios';

// ⭐ Use relative path - Vite will proxy to backend
const API_URL = "/api/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginService = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response;
};

export const verifyToken = async (token) => {
  const response = await api.get('/verify', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};