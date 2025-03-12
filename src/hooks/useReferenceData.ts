import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import { SPORTS, FOCUS_AREAS } from '../config/constants';
import { Sport, FocusArea, Position } from '../types';

interface UseReferenceDataReturn {
  sports: Sport[];
  focusAreas: FocusArea[];
  positions: Position[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and manage reference data (sports, positions, focus areas)
 * @param {number | string} sportId - The selected sport ID
 * @returns {UseReferenceDataReturn} Reference data and loading states
 */
export const useReferenceData = (sportId: number | string): UseReferenceDataReturn => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch positions when sportId changes
  useEffect(() => {
    const fetchPositions = async () => {
      if (!sportId) {
        setPositions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await apiClient.get<Position[]>(`/api/positions/sport/${sportId}`);
        setPositions(data);
      } catch (err) {
        console.error('Error fetching positions:', err);
        setError('Failed to load positions');
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [sportId]);

  return {
    // Use hardcoded data from constants
    sports: SPORTS,
    focusAreas: FOCUS_AREAS,
    // Use API data for positions
    positions,
    loading,
    error
  };
};

export default useReferenceData;