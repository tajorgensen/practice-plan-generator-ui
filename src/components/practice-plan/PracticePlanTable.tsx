import React, { useState } from 'react';
import { Clock, BarChart, Users, CheckCircle, RotateCw, Users2 } from 'lucide-react';
import { calculateTotalTime } from '../../utils/helper';
import { PracticePlan, PracticePlanSection, StationGroupDto, StationDto } from '../../types';

interface PracticePlanTableProps {
  practicePlan: PracticePlan;
}

/**
 * Practice Plan Table component with support for rotations
 * @param {PracticePlanTableProps} props
 * @returns {JSX.Element}
 */
const PracticePlanTable = ({ practicePlan }: PracticePlanTableProps): JSX.Element => {
  const [selectedRotation, setSelectedRotation] = useState(0);

  if (!practicePlan || !practicePlan.sections) {
    return <div>No practice plan data available</div>;
  }
  
  const totalTime = calculateTotalTime(practicePlan.sections);
  
  // Calculate cumulative time for each section to display start times
  let cumulativeTime = 0;
  const sectionStartTimes = practicePlan.sections.map(section => {
    const startTime = cumulativeTime;
    cumulativeTime += section.durationMinutes;
    return startTime;
  });

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold mr-4">{practicePlan.name}</h2>
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded ml-auto">
            <Clock className="mr-2 text-blue-600" size={16} />
            <span>{totalTime} / {practicePlan.totalDurationMinutes} minutes</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center bg-purple-50 px-3 py-1 rounded">
            <BarChart className="mr-2 text-purple-600" size={16} />
            <span>Focus: {practicePlan.focusAreaName}</span>
          </div>
          
          <div className="flex items-center bg-green-50 px-3 py-1 rounded">
            <Users className="mr-2 text-green-600" size={16} />
            <span>{practicePlan.sportName}</span>
          </div>
        </div>
        
        <p className="text-gray-600">{practicePlan.description}</p>
      </div>

      {/* Practice Plan Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16 text-center">
                Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {practicePlan.sections.map((section, sectionIndex) => {
              const startTimeMinutes = sectionStartTimes[sectionIndex];
              const hours = Math.floor(startTimeMinutes / 60);
              const minutes = startTimeMinutes % 60;
              const startTime = `${hours > 0 ? hours + 'h ' : ''}${minutes}m`;
              
              if (section.concurrent && section.stationGroups) {
                // Handle the stations section with rotations
                return (
                  <React.Fragment key={`section-${sectionIndex}`}>
                    <tr className="bg-gray-100">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {startTime}
                      </td>
                      <td colSpan={3} className="px-4 py-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {section.sectionType} - Rotations
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {section.stationGroups.length} rotations with {section.stationGroups[0]?.stations.length || 0} stations
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm text-gray-700">Select Rotation:</span>
                            <select 
                              value={selectedRotation}
                              onChange={(e) => setSelectedRotation(parseInt(e.target.value))}
                              className="py-1 px-2 border rounded text-sm"
                            >
                              {section.stationGroups.map((_, idx) => (
                                <option key={`rotation-${idx}`} value={idx}>
                                  Rotation {idx + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Show selected rotation */}
                    {section.stationGroups[selectedRotation]?.stations.map((station, stationIndex) => (
                      <tr 
                        key={`station-${sectionIndex}-${selectedRotation}-${stationIndex}`}
                        className={stationIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {/* Show station start time offset from section start */}
                          {startTime}+{stationIndex * (section.stationGroups[selectedRotation]?.durationMinutes || 0) / station.stationNumber}m
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <RotateCw size={16} className="text-indigo-500 mr-2" />
                              <span>Station {station.stationNumber} - Group {station.stationNumber}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{station.drill.name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* Calculate time per station */}
                          {section.stationGroups[selectedRotation]?.durationMinutes / station.stationNumber} min
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {station.drill.equipment && station.drill.equipment.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {station.drill.equipment.map((item, i) => (
                                <li key={i}>
                                  {item.equipmentName} ({item.quantity})
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              } else {
                // Regular section (warmup, position group, team time)
                return (
                  <tr 
                    key={`section-${sectionIndex}`}
                    className={sectionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {startTime}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          {section.sectionType === 'Warmup' ? (
                            <Clock className="mr-2 text-yellow-500" size={16} />
                          ) : section.sectionType === 'Position Group' ? (
                            <Users2 className="mr-2 text-purple-500" size={16} />
                          ) : (
                            <Users className="mr-2 text-green-500" size={16} />
                          )}
                          {section.sectionType}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{section.drill?.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.durationMinutes} min
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {section.drill?.equipment && section.drill.equipment.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {section.drill.equipment.map((item, i) => (
                            <li key={i}>
                              {item.equipmentName} ({item.quantity})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {/* Drill Instructions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Drill Instructions</h3>
        <div className="space-y-6">
          {/* Regular sections first */}
          {practicePlan.sections.map((section, index) => {
            if (!section.concurrent && section.drill) {
              return (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-medium">
                      {index + 1}. {section.drill.name} <span className="text-gray-500 font-normal">({section.sectionType})</span>
                    </h4>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {section.durationMinutes} min
                    </span>
                  </div>

                  {section.drill.description && (
                    <p className="text-gray-600 mb-3">{section.drill.description}</p>
                  )}

                  {section.drill.instructions && (
                    <div className="mb-3">
                      <h5 className="font-medium mb-1">Instructions:</h5>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded">{section.drill.instructions}</p>
                    </div>
                  )}

                  {section.coachingPoints && (
                    <div className="mb-3">
                      <h5 className="font-medium mb-1">Coaching Points:</h5>
                      <p className="text-blue-800 bg-blue-50 p-3 rounded">{section.coachingPoints}</p>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}

          {/* Then stations */}
          {practicePlan.sections.map((section, sectionIndex) => {
            if (section.concurrent && section.stationGroups) {
              return (
                <div key={`station-instructions-${sectionIndex}`} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h4 className="text-lg font-medium mb-4">Stations</h4>
                  
                  <div className="mb-4 p-3 bg-yellow-50 rounded">
                    <h5 className="font-medium text-amber-800">Rotation Pattern:</h5>
                    <p className="text-amber-800">
                      Groups rotate between stations every {section.stationGroups[0]?.durationMinutes / section.stationGroups[0]?.stations.length} minutes.
                      Complete {section.stationGroups.length} full rotations.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {section.stationGroups[0]?.stations.map((station, stationIndex) => (
                      <div key={`station-${stationIndex}`} className="border rounded p-3">
                        <h5 className="font-medium">Station {station.stationNumber}: {station.drill.name}</h5>
                        
                        {station.drill.description && (
                          <p className="text-gray-600 text-sm mt-1 mb-2">{station.drill.description}</p>
                        )}
                        
                        {station.drill.instructions && (
                          <div className="mt-2 mb-2">
                            <h6 className="text-sm font-medium">Instructions:</h6>
                            <p className="text-sm text-gray-800 bg-gray-50 p-2 rounded">{station.drill.instructions}</p>
                          </div>
                        )}
                        
                        {station.coachingPoints && (
                          <div className="mt-2">
                            <h6 className="text-sm font-medium">Coaching Points:</h6>
                            <p className="text-sm text-blue-800 bg-blue-50 p-2 rounded">{station.coachingPoints}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Equipment Summary */}
      {practicePlan.equipmentNeeded && practicePlan.equipmentNeeded.length > 0 && (
        <div className="mt-8 border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Equipment Needed</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {practicePlan.equipmentNeeded.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 text-green-600" size={16} />
                <span>
                  <strong>{item.equipmentName}:</strong> {item.totalQuantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PracticePlanTable;