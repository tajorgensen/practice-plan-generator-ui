import { PracticePlanSection, Sport, FocusArea } from '../types';

/**
 * Utility functions for the application
 */

/**
 * Calculate the total scheduled time from practice plan sections
 * @param {PracticePlanSection[]} sections - Practice plan sections
 * @returns {number} - Total time in minutes
 */
export const calculateTotalTime = (sections?: PracticePlanSection[]): number => {
  if (!sections || !sections.length) return 0;
  
  return sections.reduce((sum, section) => sum + section.durationMinutes, 0);
};

/**
 * Generate a practice plan name
 * @param {Sport} sport - Sport object
 * @param {FocusArea} focusArea - Focus area object (optional)
 * @returns {string} - Generated name
 */
export const generatePlanName = (sport?: Sport, focusArea?: FocusArea): string => {
  const name: string[] = [];
  
  if (sport?.name) {
    name.push(sport.name);
  }
  
  if (focusArea?.name) {
    name.push(`- ${focusArea.name}`);
  }
  
  name.push('Practice Plan');
  
  // Add a timestamp to make it unique
  name.push(`(${new Date().getTime() % 10000})`);
  
  return name.join(' ');
};

/**
 * Get section type color class
 * @param {string} sectionType - Type of section
 * @returns {string} - CSS class for color
 */
export const getSectionTypeColor = (sectionType: string): string => {
  if (sectionType === 'Warmup') return 'bg-yellow-500';
  if (sectionType === 'Team Time') return 'bg-green-500';
  if (sectionType.includes('Station')) return 'bg-blue-600';
  return 'bg-gray-500';
};

interface PlanDescriptionParams {
    totalDurationMinutes?: number;
    sportName?: string;
    focusAreaName?: string;
    warmupDurationMinutes?: number;
    coachingStations?: number;
    stationDurationMinutes?: number;
  }
  
  /**
   * Format a plan description based on parameters
   * @param {PlanDescriptionParams} params - Plan parameters
   * @returns {string} - Formatted description
   */
  export const formatPlanDescription = (params: PlanDescriptionParams): string => {
    const { 
      totalDurationMinutes = 0, 
      sportName = '', 
      focusAreaName = '', 
      warmupDurationMinutes = 0,
      coachingStations = 0,
      stationDurationMinutes
    } = params;
    
    let description = `A ${totalDurationMinutes}-minute ${sportName} practice plan`;
    
    if (focusAreaName && focusAreaName !== 'Mixed') {
      description += ` focusing on ${focusAreaName}`;
    }
    
    description += `. Features a ${warmupDurationMinutes}-minute warmup followed by ${coachingStations}`;
    
    if (stationDurationMinutes) {
      description += ` coaching stations (${stationDurationMinutes} minutes each).`;
    } else {
      description += ` coaching stations.`;
    }
    
    return description;
  };