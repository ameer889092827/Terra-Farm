import React, { useState } from 'react';
import { Crop, NasaData } from '../types';

interface ResearchLabProps {
  onClose: () => void;
  availableCrops: Crop[];
  nasaData: NasaData;
}

interface Experiment {
  id: string;
  name: string;
  description: string;
  category: 'irrigation' | 'fertilization' | 'planting' | 'harvesting' | 'sustainability';
  duration: number; // in days
  cost: number;
  requirements: string[];
  expectedResults: string[];
  nasaDataImpact: string;
  icon: string;
}

interface ActiveExperiment {
  experiment: Experiment;
  startDay: number;
  progress: number;
  results: any;
}

const ResearchLab: React.FC<ResearchLabProps> = ({ onClose, availableCrops, nasaData }) => {
  const [activeExperiments, setActiveExperiments] = useState<ActiveExperiment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  const experiments: Experiment[] = [
    {
      id: 'drip_irrigation',
      name: 'Drip Irrigation Optimization',
      description: 'Test different drip irrigation patterns to optimize water usage and crop yield.',
      category: 'irrigation',
      duration: 14,
      cost: 500,
      requirements: ['Tomatoes', 'Lettuce', 'Soil moisture sensor'],
      expectedResults: ['25% water savings', '15% yield increase', 'Reduced disease pressure'],
      nasaDataImpact: 'Uses SMAP soil moisture data to optimize irrigation timing',
      icon: '💧'
    },
    {
      id: 'precision_fertilizer',
      name: 'Precision Fertilizer Application',
      description: 'Apply fertilizers based on NDVI zones to maximize efficiency and reduce waste.',
      category: 'fertilization',
      duration: 21,
      cost: 750,
      requirements: ['Corn', 'Wheat', 'NDVI mapping'],
      expectedResults: ['30% fertilizer reduction', '20% yield increase', 'Improved soil health'],
      nasaDataImpact: 'Uses MODIS NDVI data to create variable rate application maps',
      icon: '🌿'
    },
    {
      id: 'cover_crops',
      name: 'Cover Crop Integration',
      description: 'Study the impact of cover crops on soil health and water retention.',
      category: 'sustainability',
      duration: 60,
      cost: 300,
      requirements: ['Clover seeds', 'Soil testing kit'],
      expectedResults: ['Improved soil structure', 'Reduced erosion', 'Increased organic matter'],
      nasaDataImpact: 'Monitors soil moisture and NDVI changes over time',
      icon: '🌱'
    },
    {
      id: 'companion_planting',
      name: 'Companion Planting Study',
      description: 'Test beneficial plant combinations to improve pest control and yield.',
      category: 'planting',
      duration: 45,
      cost: 200,
      requirements: ['Tomatoes', 'Basil', 'Marigolds'],
      expectedResults: ['Reduced pest damage', 'Improved flavor', 'Better space utilization'],
      nasaDataImpact: 'Tracks NDVI patterns to measure plant health interactions',
      icon: '🌻'
    },
    {
      id: 'harvest_timing',
      name: 'Optimal Harvest Timing',
      description: 'Use satellite data to determine the perfect harvest time for maximum quality.',
      category: 'harvesting',
      duration: 7,
      cost: 150,
      requirements: ['Mature crops', 'Quality testing equipment'],
      expectedResults: ['Improved crop quality', 'Better storage life', 'Higher market value'],
      nasaDataImpact: 'Uses NDVI decline patterns to predict optimal harvest timing',
      icon: '🌾'
    },
    {
      id: 'carbon_sequestration',
      name: 'Carbon Sequestration Study',
      description: 'Measure how different farming practices affect carbon storage in soil.',
      category: 'sustainability',
      duration: 90,
      cost: 1000,
      requirements: ['Soil carbon analyzer', 'Multiple crop types'],
      expectedResults: ['Increased soil carbon', 'Climate benefits', 'Improved soil fertility'],
      nasaDataImpact: 'Uses satellite data to model carbon flux and soil health',
      icon: '🌍'
    },
    {
      id: 'drought_resistance',
      name: 'Drought-Resistant Varieties',
      description: 'Test crop varieties under water stress conditions using controlled irrigation.',
      category: 'irrigation',
      duration: 30,
      cost: 400,
      requirements: ['Multiple crop varieties', 'Water stress simulation'],
      expectedResults: ['Identified drought-tolerant varieties', 'Water use efficiency data'],
      nasaDataImpact: 'Uses SMAP data to simulate drought conditions and monitor plant response',
      icon: '🏜️'
    },
    {
      id: 'organic_fertilizer',
      name: 'Organic Fertilizer Comparison',
      description: 'Compare the effectiveness of different organic fertilizers on crop growth.',
      category: 'fertilization',
      duration: 35,
      cost: 350,
      requirements: ['Compost', 'Manure', 'Fish emulsion', 'Testing plots'],
      expectedResults: ['Nutrient release patterns', 'Soil health improvements', 'Yield comparisons'],
      nasaDataImpact: 'Monitors NDVI changes to track nutrient availability and plant response',
      icon: '🥕'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'irrigation': return 'bg-blue-900/30 text-blue-300';
      case 'fertilization': return 'bg-green-900/30 text-green-300';
      case 'planting': return 'bg-yellow-900/30 text-yellow-300';
      case 'harvesting': return 'bg-orange-900/30 text-orange-300';
      case 'sustainability': return 'bg-purple-900/30 text-purple-300';
      default: return 'bg-slate-900/30 text-slate-300';
    }
  };

  const filteredExperiments = selectedCategory === 'all' 
    ? experiments 
    : experiments.filter(exp => exp.category === selectedCategory);

  const startExperiment = (experiment: Experiment) => {
    const newExperiment: ActiveExperiment = {
      experiment,
      startDay: 0,
      progress: 0,
      results: {}
    };
    setActiveExperiments([...activeExperiments, newExperiment]);
    setSelectedExperiment(null);
  };

  const renderExperimentDetails = (experiment: Experiment) => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{experiment.icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">{experiment.name}</h3>
            <p className="text-slate-300 mb-4">{experiment.description}</p>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getCategoryColor(experiment.category)}`}>
                {experiment.category.charAt(0).toUpperCase() + experiment.category.slice(1)}
              </span>
              <span className="text-slate-400">Duration: {experiment.duration} days</span>
              <span className="text-slate-400">Cost: ${experiment.cost}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-cyan-300 mb-3">📋 Requirements</h4>
          <ul className="space-y-2">
            {experiment.requirements.map((req, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-300">
                <span className="text-green-400">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-cyan-300 mb-3">🎯 Expected Results</h4>
          <ul className="space-y-2">
            {experiment.expectedResults.map((result, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-300">
                <span className="text-blue-400">→</span>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-cyan-300 mb-3">🛰️ NASA Data Integration</h4>
        <p className="text-slate-300">{experiment.nasaDataImpact}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => startExperiment(experiment)}
          className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          🧪 Start Experiment
        </button>
        <button
          onClick={() => setSelectedExperiment(null)}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
        >
          Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            🧪 Agricultural Research Lab
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {!selectedExperiment ? (
          <div>
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Research Categories</h3>
              <div className="flex gap-2 flex-wrap">
                {['all', 'irrigation', 'fertilization', 'planting', 'harvesting', 'sustainability'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Experiments */}
            {activeExperiments.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">🔬 Active Experiments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeExperiments.map((activeExp, index) => (
                    <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{activeExp.experiment.icon}</span>
                        <div>
                          <h4 className="font-semibold text-white">{activeExp.experiment.name}</h4>
                          <div className="text-sm text-slate-400">
                            Day {activeExp.startDay} of {activeExp.experiment.duration}
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                        <div 
                          className="bg-cyan-600 h-2 rounded-full transition-all"
                          style={{ width: `${(activeExp.startDay / activeExp.experiment.duration) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400">
                        Progress: {Math.round((activeExp.startDay / activeExp.experiment.duration) * 100)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Experiments */}
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-3">Available Research Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExperiments.map(experiment => (
                  <div
                    key={experiment.id}
                    onClick={() => setSelectedExperiment(experiment)}
                    className="bg-slate-900/50 p-6 rounded-lg cursor-pointer hover:bg-slate-900/70 transition-colors border border-slate-700 hover:border-cyan-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{experiment.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-cyan-300 mb-2">{experiment.name}</h4>
                        <p className="text-slate-400 text-sm mb-3">{experiment.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className={`px-2 py-1 rounded ${getCategoryColor(experiment.category)}`}>
                            {experiment.category}
                          </span>
                          <span className="text-slate-500">{experiment.duration} days</span>
                          <span className="text-slate-500">${experiment.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          renderExperimentDetails(selectedExperiment)
        )}
      </div>
    </div>
  );
};

export default ResearchLab;