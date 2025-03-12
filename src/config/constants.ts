import { Sport, FocusArea, SelectOption, FormDataType } from '../types';

/**
 * Application constants
 */

// Seed data for sports from database
export const SPORTS: Sport[] = [
  { id: 1, name: "Basketball" },
  { id: 2, name: "Football" },
  { id: 3, name: "Soccer" },
  { id: 4, name: "Baseball" }
];

// Seed data for focus areas from database
export const FOCUS_AREAS: FocusArea[] = [
  { id: 1, name: "Fundamentals" },
  { id: 2, name: "Offense" },
  { id: 3, name: "Defense" }
];

// Age groups for drill filtering
export const AGE_GROUPS: SelectOption[] = [
  { value: "", label: "Any Age" },
  { value: "6-8", label: "6-8 years" },
  { value: "9-11", label: "9-11 years" },
  { value: "12-14", label: "12-14 years" },
  { value: "15-17", label: "15-17 years" },
  { value: "18+", label: "18+ years" }
];

// Default values for practice plan parameters
export const DEFAULT_FORM_VALUES: FormDataType = {
  sportId: 1, // Basketball by default
  focusAreaId: '',
  totalDurationMinutes: 90,
  warmupDurationMinutes: 15,
  teamTimeDurationMinutes: 15,
  stationTotalDurationMinutes: 45,
  stationRotationMinutes: 5,
  positionGroupDurationMinutes: 15,
  coachingStations: 3,
  positionId: '',
  ageGroup: '',
  maxEquipmentTypes: ''
};

// Colors for practice plan sections
export const SECTION_COLORS: Record<string, string> = {
  'Warmup': 'bg-yellow-500',
  'Team Time': 'bg-green-500',
  'Position Group': 'bg-purple-500',
  'Stations': 'bg-blue-600'
};

// Form field validation constraints
export const VALIDATION_CONSTRAINTS = {
  totalDurationMinutes: {
    min: 30,
    max: 240
  },
  warmupDurationMinutes: {
    min: 5,
    max: 30
  },
  teamTimeDurationMinutes: {
    min: 0,
    max: 60
  },
  stationTotalDurationMinutes: {
    min: 0,
    max: 120
  },
  stationRotationMinutes: {
    min: 3,
    max: 20
  },
  positionGroupDurationMinutes: {
    min: 0,
    max: 45
  },
  coachingStations: {
    min: 1,
    max: 6
  }
};