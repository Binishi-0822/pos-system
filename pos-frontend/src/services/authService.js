import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth";

export const verifyToken = async (token) => {
    const response = await axios.get(`${API_URL}/verify`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


