import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/user/userDetails'; // Adjust the URL as necessary

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/userDetails`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getSingle-user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

