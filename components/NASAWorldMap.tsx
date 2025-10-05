import React, { useState, useEffect } from 'react';
import { NasaData, Location } from '../types';

// FIX: Update props to include onClose and make others optional to fix type error in App.tsx
interface NASAWorldMapProps {
  onClose: () => void;
  selectedLocation?: Location | null;
  onLocationSelect?: (location: Location) => void;
  nasaData?: NasaData | null;
}

interface MapRegion {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  nasaData: NasaData;
  agriculturalInfo: {
    primaryCrops: string[];
    farmingChallenges: string[];
    climateZone: string;
    satelliteMissions: string[];
  };
  color: string;
}

// FIX: Destructure onClose from props
const NASAWorldMap: React.FC<NASAWorldMapProps> = ({ onClose, selectedLocation, onLocationSelect, nasaData }) => {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [viewMode, setViewMode] = useState<'ndvi' | 'moisture' | 'temperature' | 'precipitation'>('ndvi');

  const mapRegions: MapRegion[] = [
    {
      id: 'central_valley_usa',
      name: 'Central Valley, USA',
      coordinates: { lat: 36.7378, lng: -119.7871 },
      nasaData: {
        soilMoisture: 45,
        temperature: 28,
        precipitation: 2,
        solarIrradiance: 750,
        windSpeed: 12,
        ndvi: 0.65,
        relativeHumidity: 35
      },
      agriculturalInfo: {
        primaryCrops: ['Almonds', 'Grapes', 'Tomatoes', 'Cotton'],
        farmingChallenges: ['Water scarcity', 'Heat stress', 'Soil salinity'],
        climateZone: 'Mediterranean',
        satelliteMissions: ['SMAP', 'MODIS', 'Landsat-8']
      },
      color: '#ff6b6b'
    },
    {
      id: 'kyoto_japan',
      name: 'Kyoto Prefecture, Japan',
      coordinates: { lat: 35.0116, lng: 135.7681 },
      nasaData: {
        soilMoisture: 75,
        temperature: 22,
        precipitation: 8,
        solarIrradiance: 450,
        windSpeed: 8,
        ndvi: 0.78,
        relativeHumidity: 70
      },
      agriculturalInfo: {
        primaryCrops: ['Rice', 'Tea', 'Vegetables', 'Fruits'],
        farmingChallenges: ['Limited land', 'Seasonal flooding', 'Urban encroachment'],
        climateZone: 'Temperate',
        satelliteMissions: ['GCOM-C', 'ALOS-2', 'MODIS']
      },
      color: '#4ecdc4'
    },
    {
      id: 'sao_paulo_brazil',
      name: 'São Paulo, Brazil',
      coordinates: { lat: -23.5505, lng: -46.6333 },
      nasaData: {
        soilMoisture: 60,
        temperature: 26,
        precipitation: 12,
        solarIrradiance: 600,
        windSpeed: 15,
        ndvi: 0.72,
        relativeHumidity: 80
      },
      agriculturalInfo: {
        primaryCrops: ['Sugarcane', 'Coffee', 'Citrus', 'Soybeans'],
        farmingChallenges: ['Deforestation', 'Soil erosion', 'Climate change'],
        climateZone: 'Tropical',
        satelliteMissions: ['CBERS-4', 'MODIS', 'Landsat-8']
      },
      color: '#45b7d1'
    },
    {
      id: 'punjab_india',
      name: 'Punjab, India',
      coordinates: { lat: 31.1471, lng: 75.3412 },
      nasaData: {
        soilMoisture: 55,
        temperature: 32,
        precipitation: 5,
        solarIrradiance: 700,
        windSpeed: 10,
        ndvi: 0.68,
        relativeHumidity: 60
      },
      agriculturalInfo: {
        primaryCrops: ['Wheat', 'Rice', 'Cotton', 'Sugarcane'],
        farmingChallenges: ['Water depletion', 'Soil degradation', 'Pesticide overuse'],
        climateZone: 'Semi-arid',
        satelliteMissions: ['RESOURCESAT-2', 'MODIS', 'Landsat-8']
      },
      color: '#f9ca24'
    },
    {
      id: 'netherlands',
      name: 'Netherlands',
      coordinates: { lat: 52.1326, lng: 5.2913 },
      nasaData: {
        soilMoisture: 80,
        temperature: 18,
        precipitation: 15,
        solarIrradiance: 400,
        windSpeed: 20,
        ndvi: 0.75,
        relativeHumidity: 85
      },
      agriculturalInfo: {
        primaryCrops: ['Tulips', 'Dairy', 'Vegetables', 'Flowers'],
        farmingChallenges: ['Land scarcity', 'Water management', 'Climate adaptation'],
        climateZone: 'Temperate Oceanic',
        satelliteMissions: ['Sentinel-2', 'MODIS', 'Landsat-8']
      },
      color: '#6c5ce7'
    },
    {
      id: 'australia_murray',
      name: 'Murray-Darling Basin, Australia',
      coordinates: { lat: -34.9285, lng: 138.6007 },
      nasaData: {
        soilMoisture: 35,
        temperature: 30,
        precipitation: 3,
        solarIrradiance: 800,
        windSpeed: 18,
        ndvi: 0.45,
        relativeHumidity: 40
      },
      agriculturalInfo: {
        primaryCrops: ['Wheat', 'Cotton', 'Citrus', 'Grapes'],
        farmingChallenges: ['Drought', 'Salinity', 'Water allocation'],
        climateZone: 'Arid',
        satelliteMissions: ['Landsat-8', 'MODIS', 'SMAP']
      },
      color: '#fd79a8'
    }
  ];

  const getRegionColor = (region: MapRegion) => {
    const data = region.nasaData;
    switch (viewMode) {
      case 'ndvi':
        if (data.ndvi > 0.7) return '#2ecc71';
        if (data.ndvi > 0.5) return '#f1c40f';
        return '#e74c3c';
      case 'moisture':
        if (data.soilMoisture > 60) return '#3498db';
        if (data.soilMoisture > 40) return '#f39c12';
        return '#e67e22';
      case 'temperature':
        if (data.temperature > 30) return '#e74c3c';
        if (data.temperature > 20) return '#f39c12';
        return '#3498db';
      case 'precipitation':
        if (data.precipitation > 10) return '#2980b9';
        if (data.precipitation > 5) return '#16a085';
        return '#d35400';
      default:
        return region.color;
    }
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case 'ndvi': return 'Vegetation Health (NDVI)';
      case 'moisture': return 'Soil Moisture (%)';
      case 'temperature': return 'Temperature (°C)';
      case 'precipitation': return 'Precipitation (mm)';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
          🛰️ NASA Global Agricultural Monitoring
        </h2>
        <button 
          // FIX: Use onClose prop for the close handler
          onClick={onClose}
          className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
        >
          &times;
        </button>
      </div>

      {/* View Mode Selector */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Satellite Data View</h3>
        <div className="flex gap-2 flex-wrap">
          {(['ndvi', 'moisture', 'temperature', 'precipitation'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {mode === 'ndvi' ? '🌱 Vegetation' : 
               mode === 'moisture' ? '💧 Soil Moisture' :
               mode === 'temperature' ? '🌡️ Temperature' : '🌧️ Precipitation'}
            </button>
          ))}
        </div>
        <p className="text-slate-400 text-sm mt-2">Currently viewing: {getViewModeLabel()}</p>
      </div>

      {/* Map Visualization */}
      <div className="mb-6">
        <div className="bg-slate-900/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Global Agricultural Regions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mapRegions.map(region => (
              <div
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                  selectedRegion?.id === region.id
                    ? 'border-cyan-400 bg-cyan-900/20'
                    : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                }`}
                style={{ borderLeftColor: getRegionColor(region), borderLeftWidth: '6px' }}
              >
                <h4 className="font-semibold text-white mb-2">{region.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">NDVI:</span>
                    <span className="text-cyan-300">{region.nasaData.ndvi.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Moisture:</span>
                    <span className="text-blue-300">{region.nasaData.soilMoisture}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Temp:</span>
                    <span className="text-orange-300">{region.nasaData.temperature}°C</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Region Details */}
      {selectedRegion && (
        <div className="space-y-6">
          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">
              📍 {selectedRegion.name} - Agricultural Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-300 mb-3">Primary Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.agriculturalInfo.primaryCrops.map((crop, index) => (
                    <span key={index} className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-300 mb-3">Climate Zone</h4>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                  {selectedRegion.agriculturalInfo.climateZone}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">🛰️ NASA Satellite Data</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-slate-800/50 rounded">
                <div className="text-2xl font-bold text-cyan-400">{selectedRegion.nasaData.ndvi.toFixed(2)}</div>
                <div className="text-sm text-slate-300">NDVI</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded">
                <div className="text-2xl font-bold text-blue-400">{selectedRegion.nasaData.soilMoisture}%</div>
                <div className="text-sm text-slate-300">Soil Moisture</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded">
                <div className="text-2xl font-bold text-orange-400">{selectedRegion.nasaData.temperature}°C</div>
                <div className="text-sm text-slate-300">Temperature</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded">
                <div className="text-2xl font-bold text-green-400">{selectedRegion.nasaData.precipitation}mm</div>
                <div className="text-sm text-slate-300">Precipitation</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">🌍 Farming Challenges</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.agriculturalInfo.farmingChallenges.map((challenge, index) => (
                <span key={index} className="px-3 py-1 bg-red-900/30 text-red-300 rounded-full text-sm">
                  {challenge}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">🛰️ Active NASA Missions</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.agriculturalInfo.satelliteMissions.map((mission, index) => (
                <span key={index} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                  {mission}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // Find the location object and select it
              const location = { id: selectedRegion.id, name: selectedRegion.name } as Location;
              // FIX: Use optional chaining as onLocationSelect might not be passed
              onLocationSelect?.(location);
            }}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
          >
            🌱 Farm in {selectedRegion.name}
          </button>
        </div>
      )}
    </div>
  );
};

export default NASAWorldMap;
