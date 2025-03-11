import axios, { AxiosResponse } from 'axios';

// Define generic response type
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const BASE_URL = 'https://backend-oni2.onrender.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic GET request with query params
export const getData = async <T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

// Generic GET ALL request
export const getAll = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error getting all data:', error);
    throw error;
  }
};

// Generic POST request
export const postData = async <T>(endpoint: string, data: Record<string, unknown>): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Generic PUT request
export const updateData = async <T>(endpoint: string, data: Record<string, unknown>): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Generic DELETE request
export const deleteData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};