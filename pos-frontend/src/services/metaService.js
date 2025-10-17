import axios from 'axios';

const API_URL = "http://localhost:3000/api/meta-data";

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};


export const getMeasurements = async () => {
    try {
        const response = await axios.get(`${API_URL}/measurements`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching measurements:", error);
        return [];
    }
};