/**
 * Type definitions for the application
 */

export interface Sport {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface FocusArea {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface Position {
    id: number;
    name: string;
    description?: string;
    sportId: number;
    sportName?: string;
  }
  
  export interface DrillEquipment {
    id?: number;
    drillId: number;
    equipmentId: number;
    quantity: number;
    drillName?: string;
    equipmentName: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Drill {
    id: number;
    name: string;
    description?: string;
    instructions?: string;
    durationMinutes?: number;
    difficultyLevel?: string;
    focusAreaId: number;
    focusAreaName?: string;
    sportIds?: number[];
    positionIds?: number[];
    kpiIds?: number[];
    equipment?: DrillEquipment[];
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface StationDto {
    stationNumber: number;
    drill: Drill;
    coachingPoints?: string;
  }
  
  export interface StationGroupDto {
    rotationNumber: number;
    durationMinutes: number;
    stations: StationDto[];
  }
  
  export interface PracticePlanSection {
    sectionType: string;
    durationMinutes: number;
    drill?: Drill;
    stationGroups?: StationGroupDto[];
    coachingPoints?: string;
    concurrent?: boolean;
  }
  
  export interface EquipmentSummary {
    equipmentId: number;
    equipmentName: string;
    totalQuantity: number;
  }
  
  export interface PracticePlan {
    id?: number;
    name: string;
    description: string;
    sportId?: number;
    sportName: string;
    focusAreaId?: number;
    focusAreaName: string;
    totalDurationMinutes: number;
    sections: PracticePlanSection[];
    equipmentNeeded: EquipmentSummary[];
  }
  
  export interface FormDataType {
    sportId: number | '';
    focusAreaId: number | '';
    totalDurationMinutes: number;
    warmupDurationMinutes: number;
    teamTimeDurationMinutes: number | '';
    stationTotalDurationMinutes: number | '';
    stationRotationMinutes: number | '';
    positionGroupDurationMinutes: number | '';
    coachingStations: number;
    positionId: number | '';
    ageGroup: string;
    maxEquipmentTypes: number | '';
  }
  
  export interface SelectOption {
    id?: number;
    value?: string | number;
    name?: string;
    label?: string;
  }
  
  export interface ApiErrorResponse {
    message: string;
    status?: number;
    timestamp?: string;
    details?: string;
    errorCode?: string;
  }