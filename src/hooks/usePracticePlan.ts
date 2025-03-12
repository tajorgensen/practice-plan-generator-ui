import { useState, ChangeEvent, FormEvent } from 'react';
import practicePlanService from '../services/practicePlanService';
import { DEFAULT_FORM_VALUES } from '../config/constants';
import { FormDataType, PracticePlan } from '../types';

interface UsePracticePlanReturn {
  formData: FormDataType;
  practicePlan: PracticePlan | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  generatePracticePlan: () => Promise<void>;
  savePracticePlan: () => Promise<void>;
  resetForm: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Hook to manage practice plan generation and state
 * @returns {UsePracticePlanReturn} Practice plan state and handler functions
 */
const usePracticePlan = (): UsePracticePlanReturn => {
  const [formData, setFormData] = useState<FormDataType>(DEFAULT_FORM_VALUES);
  const [practicePlan, setPracticePlan] = useState<PracticePlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form input changes
   * @param {ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Input change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    
    // Convert numeric values to numbers and empty strings to empty strings
    const processedValue = 
      value === '' ? '' : 
      ['sportId', 'focusAreaId', 'positionId', 'totalDurationMinutes', 
       'warmupDurationMinutes', 'teamTimeDurationMinutes', 'stationDurationMinutes', 
       'coachingStations', 'maxEquipmentTypes'].includes(name) 
        ? parseInt(value, 10) 
        : value;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: processedValue
    }));
  };

  /**
   * Generate practice plan preview
   */
  const generatePracticePlan = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setPracticePlan(null);
    setSuccess(false);
    
    // Create a copy of the form data, removing empty fields
    const requestData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );
    
    try {
      const data = await practicePlanService.generatePlanPreview(requestData);
      setPracticePlan(data);
      setSuccess(true);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Error generating practice plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate practice plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save practice plan to database
   */
  const savePracticePlan = async (): Promise<void> => {
    if (!practicePlan) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const requestData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      );
      
      await practicePlanService.generateAndSavePlan(requestData);
      setSuccess(true);
      alert('Practice plan saved successfully!');
    } catch (err) {
      console.error('Error saving practice plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to save practice plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset form to default values
   */
  const resetForm = (): void => {
    setFormData(DEFAULT_FORM_VALUES);
    setPracticePlan(null);
    setSuccess(false);
    setError(null);
  };

  /**
   * Handle form submission
   * @param {FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await generatePracticePlan();
  };

  return {
    formData,
    practicePlan,
    loading,
    success,
    error,
    handleInputChange,
    generatePracticePlan,
    savePracticePlan,
    resetForm,
    handleSubmit
  };
};

export default usePracticePlan;