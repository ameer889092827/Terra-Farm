
import React, { useState, useEffect } from 'react';
import { NasaData, Crop } from '../types';
import { getEducationalContent } from '../services/geminiService';

interface ScenarioModalProps {
  scenario: 'heat_wave' | 'sensor_malfunction' | 'pest_outbreak';
  onClose: () => void;
}

const ScenarioModal: React.FC<ScenarioModalProps> = ({ scenario, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState('');

    useEffect(() => {
        setIsLoading(true);
        const fetchContent = async () => {
            try {
                const context = `An educational scenario has occurred: ${scenario.replace('_', ' ')}. Please generate the detailed explanation for this scenario based on the master prompt.`;
                // Note: Passing null for crop/tile and dummy NASA data as it's a general scenario explanation
                const dummyNasaData = { temperature: 36, soilMoisture: 30, ndvi: 0.4, precipitation: 0, solarIrradiance: 900, windSpeed: 10, relativeHumidity: 40 };
                const result = await getEducationalContent(context, null, null, dummyNasaData);
                setContent(result);
            } catch (error) {
                console.error("Failed to get scenario content:", error);
                setContent("Error: Could not retrieve detailed information for this scenario.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, [scenario]);

  const getScenarioIcon = () => {
    switch (scenario) {
      case 'heat_wave': return '🌡️';
      case 'sensor_malfunction': return '🔧';
      case 'pest_outbreak': return '🐛';
      default: return '⚠️';
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-5xl animate-spin">🛰️</div>
          <p className="mt-4 text-cyan-300">Analyzing scenario data...</p>
        </div>
      );
    }
    return (
      <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            <span className="text-4xl">{getScenarioIcon()}</span>
            Educational Scenario
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg min-h-[300px]">
          {renderContent()}
        </div>

        <button 
          onClick={onClose} 
          className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
        >
          Understood
        </button>
      </div>
    </div>
  );
};

export default ScenarioModal;
