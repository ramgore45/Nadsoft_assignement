import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchStudents = async (page, limit) => {
  try {
    const response = await axios.get(`${API_URL}/students?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const fetchStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};

export const createStudent = async (student) => {
  try {
    const response = await axios.post(`${API_URL}/students`, student);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, student);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with ID ${id}:`, error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}:`, error);
    throw error;
  }
};
