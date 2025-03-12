import React, { ChangeEvent, FormEvent } from 'react';
import { FormInput, FormSelect, FormButton } from './index';
import { AGE_GROUPS, VALIDATION_CONSTRAINTS } from '../../config/constants';
import { FormDataType, Sport, FocusArea, Position } from '../../types';

interface PracticeParametersFormProps {
  formData: FormDataType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sports: Sport[];
  focusAreas: FocusArea[];
  positions: Position[];
  loading: boolean;
}

/**
 * Practice Parameters Form component
 * @param {PracticeParametersFormProps} props
 * @returns {JSX.Element}
 */
const PracticeParametersForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit,
  sports,
  focusAreas,
  positions,
  loading
}: PracticeParametersFormProps): JSX.Element => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Practice Parameters</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Sport Selection */}
        <FormSelect
          name="sportId"
          value={formData.sportId}
          onChange={handleInputChange}
          label="Sport"
          options={sports}
          required
          placeholder="Select Sport"
        />
        
        {/* Focus Area */}
        <FormSelect
          name="focusAreaId"
          value={formData.focusAreaId}
          onChange={handleInputChange}
          label="Focus Area"
          options={focusAreas}
          placeholder="All Focus Areas"
        />
        
        {/* Position (if available) */}
        {positions.length > 0 && (
          <FormSelect
            name="positionId"
            value={formData.positionId}
            onChange={handleInputChange}
            label="Position"
            options={positions}
            placeholder="All Positions"
          />
        )}
        
        {/* Age Group */}
        <FormSelect
          name="ageGroup"
          value={formData.ageGroup}
          onChange={handleInputChange}
          label="Age Group"
          options={AGE_GROUPS}
          placeholder="Any Age"
        />
        
        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>
        <h3 className="text-lg font-medium mb-3">Practice Structure</h3>
        
        {/* Time Parameters */}
        <FormInput
          type="number"
          name="totalDurationMinutes"
          value={formData.totalDurationMinutes}
          onChange={handleInputChange}
          label="Total Practice Duration (minutes)"
          min={VALIDATION_CONSTRAINTS.totalDurationMinutes.min}
          max={VALIDATION_CONSTRAINTS.totalDurationMinutes.max}
          required
        />
        
        <FormInput
          type="number"
          name="warmupDurationMinutes"
          value={formData.warmupDurationMinutes}
          onChange={handleInputChange}
          label="Warmup Duration (minutes)"
          min={VALIDATION_CONSTRAINTS.warmupDurationMinutes.min}
          max={VALIDATION_CONSTRAINTS.warmupDurationMinutes.max}
          required
        />
        
        {/* Station parameters */}
        <div className="bg-blue-50 p-3 rounded mb-4">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Station Setup</h4>
          
          <FormInput
            type="number"
            name="coachingStations"
            value={formData.coachingStations}
            onChange={handleInputChange}
            label="Number of Coaching Stations"
            min={VALIDATION_CONSTRAINTS.coachingStations.min}
            max={VALIDATION_CONSTRAINTS.coachingStations.max}
            required
          />
          
          <FormInput
            type="number"
            name="stationTotalDurationMinutes"
            value={formData.stationTotalDurationMinutes}
            onChange={handleInputChange}
            label="Total Station Time (minutes)"
            min={VALIDATION_CONSTRAINTS.stationTotalDurationMinutes.min}
            max={VALIDATION_CONSTRAINTS.stationTotalDurationMinutes.max}
          />
          
          <FormInput
            type="number"
            name="stationRotationMinutes"
            value={formData.stationRotationMinutes}
            onChange={handleInputChange}
            label="Time Per Rotation (minutes)"
            min={VALIDATION_CONSTRAINTS.stationRotationMinutes.min}
            max={VALIDATION_CONSTRAINTS.stationRotationMinutes.max}
            placeholder="Time spent at each station"
          />
        </div>
        
        {/* Position Group time */}
        <FormInput
          type="number"
          name="positionGroupDurationMinutes"
          value={formData.positionGroupDurationMinutes}
          onChange={handleInputChange}
          label="Position Group Time (minutes)"
          min={VALIDATION_CONSTRAINTS.positionGroupDurationMinutes.min}
          max={VALIDATION_CONSTRAINTS.positionGroupDurationMinutes.max}
          placeholder="Optional position-specific work"
        />
        
        {/* Team Time */}
        <FormInput
          type="number"
          name="teamTimeDurationMinutes"
          value={formData.teamTimeDurationMinutes}
          onChange={handleInputChange}
          label="Team Time (minutes)"
          min={VALIDATION_CONSTRAINTS.teamTimeDurationMinutes.min}
          max={VALIDATION_CONSTRAINTS.teamTimeDurationMinutes.max}
          placeholder="Optional team activities"
        />
        
        {/* Misc Parameters */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <FormInput
            type="number"
            name="maxEquipmentTypes"
            value={formData.maxEquipmentTypes}
            onChange={handleInputChange}
            label="Max Equipment Types"
            min={1}
            placeholder="No limit if empty"
          />
        </div>
        
        <div className="mt-6">
          <FormButton
            type="submit"
            text={loading ? 'Generating...' : 'Generate Practice Plan'}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          />
        </div>
      </form>
    </div>
  );
};

export default PracticeParametersForm;