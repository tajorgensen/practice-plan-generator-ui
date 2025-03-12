import React from 'react';
import { PageContainer } from '../components/common';
import { ErrorAlert } from '../components/common';
import PracticeParametersForm from '../components/form/PracticeParametersForm';
import { PracticePlanPreview } from '../components/practice-plan';
import usePracticePlan from '../hooks/usePracticePlan';
import useReferenceData from '../hooks/useReferenceData';

/**
 * Practice Plan Generator Page component
 * @returns {JSX.Element}
 */
const PracticePlanGeneratorPage = (): JSX.Element => {
  const {
    formData,
    practicePlan,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    savePracticePlan
  } = usePracticePlan();
  
  const { sports, focusAreas, positions } = useReferenceData(formData.sportId);
  
  return (
    <PageContainer title="Practice Plan Generator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form */}
        <div className="md:col-span-1">
          <PracticeParametersForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            sports={sports}
            focusAreas={focusAreas}
            positions={positions}
            loading={loading}
          />
        </div>
        
        {/* Results */}
        <div id="results" className="md:col-span-2">
          <ErrorAlert message={error} />
          
          <PracticePlanPreview
            practicePlan={practicePlan}
            handleSave={savePracticePlan}
            loading={loading}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default PracticePlanGeneratorPage;