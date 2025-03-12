import { ApiErrorResponse } from '../types';

/**
 * API Client for making HTTP requests
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Makes a GET request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<T>} - The API response
 */
export const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorData = await response.json() as ApiErrorResponse;
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Makes a POST request to the specified endpoint
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request payload
 * @returns {Promise<T>} - The API response
 */
export const post = async <T>(endpoint: string, data: unknown): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json() as ApiErrorResponse;
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error);
    throw error;
  }
};

// Add other HTTP methods (PUT, DELETE, etc.) as needed

const apiClient = {
  get,
  post,
};

export default apiClient;