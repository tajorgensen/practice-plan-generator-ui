import apiClient from './apiClient';
import { PracticePlan, FormDataType } from '../types';

/**
 * Service for practice plan related API calls
 */
const practicePlanService = {
  /**
   * Generate a practice plan preview
   * @param {FormDataType} requestData - The practice plan parameters
   * @returns {Promise<PracticePlan>} - The preview practice plan
   */
  generatePlanPreview: (requestData: Partial<FormDataType>): Promise<PracticePlan> => {
    return apiClient.post<PracticePlan>('/api/practice-plans/generator/preview', requestData);
  },

  /**
   * Generate and save a practice plan
   * @param {FormDataType} requestData - The practice plan parameters
   * @returns {Promise<PracticePlan>} - The saved practice plan
   */
  generateAndSavePlan: (requestData: Partial<FormDataType>): Promise<PracticePlan> => {
    return apiClient.post<PracticePlan>('/api/practice-plans/generator', requestData);
  },

  /**
   * Get all practice plans
   * @returns {Promise<PracticePlan[]>} - Array of practice plans
   */
  getAllPlans: (): Promise<PracticePlan[]> => {
    return apiClient.get<PracticePlan[]>('/api/practice-plans');
  },

  /**
   * Get a practice plan by ID
   * @param {number} id - Practice plan ID
   * @returns {Promise<PracticePlan>} - The practice plan
   */
  getPlanById: (id: number): Promise<PracticePlan> => {
    return apiClient.get<PracticePlan>(`/api/practice-plans/${id}`);
  }
};

export default practicePlanService;