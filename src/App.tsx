import React from 'react';
import PracticePlanGeneratorPage from './pages/PracticePlanGeneratorPage';

/**
 * Main App component
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-100">
      <PracticePlanGeneratorPage />
    </div>
  );
}

export default App;