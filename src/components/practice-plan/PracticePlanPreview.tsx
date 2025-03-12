import React from 'react';
import { Save } from 'lucide-react';
import { FormButton } from '../form';
import PracticePlanTable from './PracticePlanTable';
import { PracticePlan } from '../../types';

interface PracticePlanPreviewProps {
  practicePlan: PracticePlan | null;
  handleSave: () => void;
  loading: boolean;
}

/**
 * Practice Plan Preview component
 * Updated to use the table format with instructions below
 * @param {PracticePlanPreviewProps} props
 * @returns {JSX.Element | null}
 */
export const PracticePlanPreview = ({ 
  practicePlan, 
  handleSave, 
  loading 
}: PracticePlanPreviewProps): JSX.Element | null => {
  if (!practicePlan) return null;
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-6">
      <div className="flex justify-end mb-4">
        <FormButton
          onClick={handleSave}
          text="Save Practice Plan"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white"
          icon={<Save size={16} />}
        />
      </div>
      
      <PracticePlanTable practicePlan={practicePlan} />
    </div>
  );
};

export default PracticePlanPreview;