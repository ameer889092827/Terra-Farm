import React, { useState } from 'react';
import { Crop, NasaData } from '../types';

interface LearningModule {
  id: string;
  title: string;
  icon: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  interactiveElements: string[];
}

interface LearningModulesProps {
  onClose: () => void;
  selectedCrop?: Crop;
  nasaData?: NasaData;
}

const LearningModules: React.FC<LearningModulesProps> = ({ onClose, selectedCrop, nasaData }) => {
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const modules: LearningModule[] = [
    {
      id: 'photosynthesis',
      title: 'Photosynthesis & NDVI',
      icon: '🌱',
      description: 'Learn how plants convert sunlight into energy and how NASA satellites measure this process.',
      difficulty: 'Beginner',
      duration: '15 minutes',
      topics: ['Chlorophyll', 'Light absorption', 'NDVI calculation', 'Satellite monitoring'],
      interactiveElements: ['NDVI calculator', 'Light spectrum explorer', 'Plant growth simulator']
    },
    {
      id: 'soil_science',
      title: 'Soil Science & Moisture',
      icon: '🌍',
      description: 'Understand soil composition, water retention, and how NASA measures soil moisture from space.',
      difficulty: 'Intermediate',
      duration: '20 minutes',
      topics: ['Soil texture', 'Water holding capacity', 'SMAP satellite', 'Irrigation planning'],
      interactiveElements: ['Soil texture triangle', 'Moisture calculator', 'Irrigation simulator']
    },
    {
      id: 'weather_agriculture',
      title: 'Weather & Agriculture',
      icon: '🌦️',
      description: 'Explore how weather patterns affect crop growth and how to use NASA weather data for farming decisions.',
      difficulty: 'Intermediate',
      duration: '25 minutes',
      topics: ['Temperature effects', 'Precipitation patterns', 'Wind impact', 'Climate adaptation'],
      interactiveElements: ['Weather impact simulator', 'Climate zone explorer', 'Crop stress calculator']
    },
    {
      id: 'precision_agriculture',
      title: 'Precision Agriculture',
      icon: '🎯',
      description: 'Discover how satellite data enables precise farming techniques and sustainable agriculture.',
      difficulty: 'Advanced',
      duration: '30 minutes',
      topics: ['Variable rate application', 'Yield mapping', 'Site-specific management', 'Sustainability'],
      interactiveElements: ['Precision farming simulator', 'Yield prediction model', 'Sustainability calculator']
    },
    {
      id: 'crop_physiology',
      title: 'Crop Physiology',
      icon: '🧬',
      description: 'Deep dive into plant biology, growth stages, and how environmental factors affect crop development.',
      difficulty: 'Advanced',
      duration: '35 minutes',
      topics: ['Plant hormones', 'Nutrient uptake', 'Stress responses', 'Growth modeling'],
      interactiveElements: ['Plant growth model', 'Nutrient deficiency detector', 'Stress response simulator']
    },
    {
      id: 'climate_change',
      title: 'Climate Change & Agriculture',
      icon: '🌡️',
      description: 'Understand the impacts of climate change on agriculture and adaptation strategies using NASA climate data.',
      difficulty: 'Advanced',
      duration: '40 minutes',
      topics: ['Climate trends', 'Adaptation strategies', 'Carbon sequestration', 'Resilient farming'],
      interactiveElements: ['Climate impact model', 'Adaptation planner', 'Carbon footprint calculator']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900/30 text-green-300';
      case 'Intermediate': return 'bg-yellow-900/30 text-yellow-300';
      case 'Advanced': return 'bg-red-900/30 text-red-300';
      default: return 'bg-slate-900/30 text-slate-300';
    }
  };

  const renderModuleContent = (module: LearningModule) => {
    switch (module.id) {
      case 'photosynthesis':
        return (
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">🌱 How Photosynthesis Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-300 mb-3">The Process</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">☀️</span>
                      <div>
                        <div className="font-medium text-white">Light Absorption</div>
                        <div className="text-sm text-slate-400">Chlorophyll captures sunlight energy</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💧</span>
                      <div>
                        <div className="font-medium text-white">Water Uptake</div>
                        <div className="text-sm text-slate-400">Roots absorb water from soil</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🌬️</span>
                      <div>
                        <div className="font-medium text-white">CO₂ Intake</div>
                        <div className="text-sm text-slate-400">Leaves absorb carbon dioxide</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍯</span>
                      <div>
                        <div className="font-medium text-white">Sugar Production</div>
                        <div className="text-sm text-slate-400">Glucose is created for plant energy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-300 mb-3">NDVI Measurement</h4>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-cyan-400">
                        {nasaData?.ndvi.toFixed(2) || '0.65'}
                      </div>
                      <div className="text-sm text-slate-400">Current NDVI</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Formula:</span>
                        <span className="text-cyan-300">(NIR - Red) / (NIR + Red)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Range:</span>
                        <span className="text-green-300">0.0 - 1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Healthy plants:</span>
                        <span className="text-green-300">0.6 - 0.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">🛰️ NASA Satellite Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🛰️</div>
                  <h4 className="font-semibold text-white mb-2">MODIS</h4>
                  <p className="text-sm text-slate-400">Daily vegetation monitoring</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🛰️</div>
                  <h4 className="font-semibold text-white mb-2">Landsat-8</h4>
                  <p className="text-sm text-slate-400">High-resolution crop analysis</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl mb-2">🛰️</div>
                  <h4 className="font-semibold text-white mb-2">Sentinel-2</h4>
                  <p className="text-sm text-slate-400">European crop monitoring</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">🧮 Interactive NDVI Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2">Near-Infrared (NIR) Value</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    defaultValue="0.8"
                    className="w-full"
                  />
                  <div className="text-center text-cyan-300 font-bold">0.80</div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Red Value</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    defaultValue="0.2"
                    className="w-full"
                  />
                  <div className="text-center text-red-300 font-bold">0.20</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-3xl font-bold text-cyan-400">NDVI = 0.60</div>
                <div className="text-sm text-slate-400">Healthy vegetation</div>
              </div>
            </div>
          </div>
        );

      case 'soil_science':
        return (
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">🌍 Soil Composition & Water</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-3xl mb-2">🏔️</div>
                  <h4 className="font-semibold text-white mb-2">Sand</h4>
                  <p className="text-sm text-slate-400">Large particles, drains quickly</p>
                  <div className="mt-2 text-xs text-slate-500">Water holding: Low</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-3xl mb-2">🌾</div>
                  <h4 className="font-semibold text-white mb-2">Silt</h4>
                  <p className="text-sm text-slate-400">Medium particles, balanced</p>
                  <div className="mt-2 text-xs text-slate-500">Water holding: Medium</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-3xl mb-2">🏺</div>
                  <h4 className="font-semibold text-white mb-2">Clay</h4>
                  <p className="text-sm text-slate-400">Small particles, holds water</p>
                  <div className="mt-2 text-xs text-slate-500">Water holding: High</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">🛰️ SMAP Satellite Technology</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📡</div>
                  <div>
                    <h4 className="font-semibold text-white">Microwave Radiometry</h4>
                    <p className="text-sm text-slate-400">Measures soil moisture by detecting microwave emissions from Earth's surface</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-semibold text-white">Data Resolution</h4>
                    <p className="text-sm text-slate-400">36km resolution, updated every 2-3 days globally</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <h4 className="font-semibold text-white">Global Coverage</h4>
                    <p className="text-sm text-slate-400">Monitors soil moisture in the top 5cm of soil worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">💧 Soil Moisture Levels</h3>
              <div className="space-y-3">
                {[
                  { level: 'Saturated', range: '80-100%', color: 'bg-blue-500', description: 'Too wet, risk of root rot' },
                  { level: 'Optimal', range: '50-80%', color: 'bg-green-500', description: 'Perfect for plant growth' },
                  { level: 'Dry', range: '30-50%', color: 'bg-yellow-500', description: 'Plants may show stress' },
                  { level: 'Very Dry', range: '0-30%', color: 'bg-red-500', description: 'Irrigation needed immediately' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{item.level} ({item.range})</div>
                      <div className="text-sm text-slate-400">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">Module Under Development</h3>
            <p className="text-slate-400">This interactive learning module is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            📚 Agricultural Learning Modules
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        {!selectedModule ? (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-slate-300 text-lg">
                Choose a learning module to explore agricultural science and NASA satellite technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map(module => (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className="bg-slate-900/50 p-6 rounded-lg cursor-pointer hover:bg-slate-900/70 transition-colors border border-slate-700 hover:border-cyan-500"
                >
                  <div className="text-4xl mb-3">{module.icon}</div>
                  <h3 className="text-lg font-semibold text-cyan-300 mb-2">{module.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{module.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="text-xs text-slate-500">{module.duration}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-500">Topics:</div>
                    <div className="flex flex-wrap gap-1">
                      {module.topics.slice(0, 3).map((topic, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-800/50 text-slate-300 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                      {module.topics.length > 3 && (
                        <span className="px-2 py-1 bg-slate-800/50 text-slate-500 rounded text-xs">
                          +{module.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedModule(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ← Back to Modules
              </button>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-3">
                  {selectedModule.icon} {selectedModule.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyColor(selectedModule.difficulty)}`}>
                    {selectedModule.difficulty}
                  </span>
                  <span className="text-sm text-slate-500">{selectedModule.duration}</span>
                </div>
              </div>
            </div>

            {renderModuleContent(selectedModule)}

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModules;