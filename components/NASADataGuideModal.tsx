
import React, { useState, useEffect } from 'react';
import { getEducationalContent } from '../services/geminiService';

interface NASADataGuideModalProps {
  onClose: () => void;
}

const metrics = [
    "NDVI (Normalized Difference Vegetation Index)",
    "Soil Moisture Percentage",
    "Temperature Data",
    "Precipitation",
    "Solar Irradiance",
    "Wind Speed",
    "Relative Humidity",
];

const NASADataGuideModal: React.FC<NASADataGuideModalProps> = ({ onClose }) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedMetric) {
      setIsLoading(true);
      const fetchContent = async () => {
        try {
          const context = `User is viewing the NASA Data Interpretation Guide and has selected "${selectedMetric}". Provide a detailed explanation of this metric based on the master prompt.`;
          const dummyNasaData = { temperature: 22, soilMoisture: 55, ndvi: 0.6, precipitation: 5, solarIrradiance: 600, windSpeed: 10, relativeHumidity: 65 };
          const result = await getEducationalContent(context, null, null, dummyNasaData);
          setContent(result);
        } catch (error) {
          console.error("Failed to get data guide content:", error);
          setContent(`Error: Could not retrieve detailed information for ${selectedMetric}.`);
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    }
  }, [selectedMetric]);

  const renderContent = () => {
    if (!selectedMetric) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛰️</div>
                  <h3 className="text-xl font-semibold text-cyan-300 mb-2">Select a Metric</h3>
                  <p className="text-slate-400">Choose a NASA data metric from the list to learn how to interpret it for farming decisions.</p>
                </div>
            </div>
        );
    }
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-5xl animate-spin">🛰️</div>
          <p className="mt-4 text-cyan-300">Fetching guide for {selectedMetric}...</p>
        </div>
      );
    }
    return (
      <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            🛰️ NASA Data Interpretation Guide
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metrics List */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Available Metrics</h3>
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMetric(metric)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedMetric === metric
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="font-medium">{metric.split('(')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Metric Details */}
          <div className="lg:col-span-2 bg-slate-900/50 p-4 rounded-lg min-h-[400px]">
            {renderContent()}
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
};

export default NASADataGuideModal;
