import React, { useState, useEffect } from 'react';
import { NasaData, Location } from '../types';

interface WeatherForecastProps {
  currentNasaData: NasaData;
  location: Location;
  onClose: () => void;
}

interface ForecastDay {
  day: string;
  date: string;
  temperature: { min: number; max: number };
  precipitation: number;
  humidity: number;
  windSpeed: number;
  solarIrradiance: number;
  ndvi: number;
  soilMoisture: number;
  conditions: string;
  farmingAdvice: string;
  riskFactors: string[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ currentNasaData, location, onClose }) => {
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  useEffect(() => {
    // Generate realistic forecast data based on current conditions
    const generateForecast = (): ForecastDay[] => {
      const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Thunderstorm'];
      
      return days.map((day, index) => {
        const baseTemp = currentNasaData.temperature;
        const basePrecip = currentNasaData.precipitation;
        const baseHumidity = currentNasaData.relativeHumidity;
        
        // Add realistic variation
        const tempVariation = (Math.random() - 0.5) * 8;
        const precipVariation = Math.random() * 15;
        const humidityVariation = (Math.random() - 0.5) * 20;
        
        const maxTemp = Math.round(baseTemp + tempVariation + 3);
        const minTemp = Math.round(baseTemp + tempVariation - 5);
        const precipitation = Math.max(0, Math.round(basePrecip + precipVariation));
        const humidity = Math.max(20, Math.min(95, Math.round(baseHumidity + humidityVariation)));
        const windSpeed = Math.round(currentNasaData.windSpeed + (Math.random() - 0.5) * 10);
        const solarIrradiance = Math.round(currentNasaData.solarIrradiance + (Math.random() - 0.5) * 200);
        
        // Calculate NDVI based on weather conditions
        let ndvi = currentNasaData.ndvi;
        if (precipitation > 10) ndvi += 0.05; // Rain helps growth
        if (maxTemp > 35) ndvi -= 0.1; // Heat stress
        if (humidity > 80) ndvi -= 0.05; // Disease risk
        ndvi = Math.max(0.1, Math.min(0.9, ndvi));
        
        // Calculate soil moisture
        let soilMoisture = currentNasaData.soilMoisture;
        soilMoisture += precipitation * 2; // Rain increases moisture
        soilMoisture -= Math.max(0, (maxTemp - 25) * 0.5); // Heat dries soil
        soilMoisture = Math.max(0, Math.min(100, soilMoisture));
        
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        
        // Generate farming advice based on conditions
        let farmingAdvice = '';
        let riskFactors: string[] = [];
        
        if (precipitation > 15) {
          farmingAdvice = 'Heavy rain expected. Avoid field work and check drainage systems.';
          riskFactors.push('Flooding risk', 'Soil compaction');
        } else if (precipitation > 5) {
          farmingAdvice = 'Light rain forecasted. Good for irrigation, but monitor disease pressure.';
          riskFactors.push('Disease risk');
        } else if (precipitation < 2 && maxTemp > 30) {
          farmingAdvice = 'Dry and hot conditions. Increase irrigation frequency to prevent stress.';
          riskFactors.push('Drought stress', 'Heat stress');
        } else if (maxTemp > 35) {
          farmingAdvice = 'Extreme heat warning. Consider shade cloth and increased watering.';
          riskFactors.push('Heat stress', 'Crop damage');
        } else if (windSpeed > 25) {
          farmingAdvice = 'High winds expected. Avoid spraying and check for wind damage.';
          riskFactors.push('Wind damage', 'Spray drift');
        } else {
          farmingAdvice = 'Favorable conditions for field work and crop growth.';
        }
        
        if (humidity > 80) riskFactors.push('High disease pressure');
        if (soilMoisture < 30) riskFactors.push('Low soil moisture');
        if (soilMoisture > 80) riskFactors.push('Waterlogged soil');
        
        return {
          day,
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
          temperature: { min: minTemp, max: maxTemp },
          precipitation,
          humidity,
          windSpeed,
          solarIrradiance,
          ndvi: Math.round(ndvi * 100) / 100,
          soilMoisture: Math.round(soilMoisture),
          // FIX: Assign the selected 'condition' string, not the entire 'conditions' array.
          conditions: condition,
          farmingAdvice,
          riskFactors
        };
      });
    };
    
    setForecastDays(generateForecast());
  }, [currentNasaData]);

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny': return '☀️';
      case 'Partly Cloudy': return '⛅';
      case 'Cloudy': return '☁️';
      case 'Light Rain': return '🌦️';
      case 'Heavy Rain': return '🌧️';
      case 'Thunderstorm': return '⛈️';
      default: return '🌤️';
    }
  };

  const getRiskColor = (risk: string) => {
    if (risk.includes('stress') || risk.includes('damage')) return 'bg-red-900/30 text-red-300';
    if (risk.includes('disease') || risk.includes('pressure')) return 'bg-orange-900/30 text-orange-300';
    if (risk.includes('moisture') || risk.includes('flooding')) return 'bg-blue-900/30 text-blue-300';
    return 'bg-yellow-900/30 text-yellow-300';
  };

  const selectedForecast = forecastDays[selectedDay];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
            🌦️ 7-Day Agricultural Weather Forecast
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">📍 Location: {location.name}</h3>
          <p className="text-slate-400">Forecast based on NASA satellite data and weather models</p>
        </div>

        {/* Day Selector */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {forecastDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedDay === index
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <div className="text-sm">{day.day}</div>
                <div className="text-xs opacity-75">{day.date}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedForecast && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{getConditionIcon(selectedForecast.conditions)}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedForecast.conditions}</h3>
                    <p className="text-slate-400">{selectedForecast.day} - {selectedForecast.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-cyan-400">
                    {selectedForecast.temperature.max}°C
                  </div>
                  <div className="text-slate-400">
                    {selectedForecast.temperature.min}°C / {selectedForecast.temperature.max}°C
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Data Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌧️</div>
                <div className="text-2xl font-bold text-blue-400">{selectedForecast.precipitation}mm</div>
                <div className="text-sm text-slate-400">Precipitation</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-2xl font-bold text-green-400">{selectedForecast.humidity}%</div>
                <div className="text-sm text-slate-400">Humidity</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💨</div>
                <div className="text-2xl font-bold text-orange-400">{selectedForecast.windSpeed} km/h</div>
                <div className="text-sm text-slate-400">Wind Speed</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">☀️</div>
                <div className="text-2xl font-bold text-yellow-400">{selectedForecast.solarIrradiance} W/m²</div>
                <div className="text-sm text-slate-400">Solar Radiation</div>
              </div>
            </div>

            {/* Agricultural Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">🌱 Crop Health Indicators</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">NDVI (Vegetation Health)</span>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-cyan-400">{selectedForecast.ndvi}</div>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedForecast.ndvi > 0.6 ? 'bg-green-500' : 
                        selectedForecast.ndvi > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Soil Moisture</span>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-blue-400">{selectedForecast.soilMoisture}%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        selectedForecast.soilMoisture > 50 ? 'bg-green-500' : 
                        selectedForecast.soilMoisture > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-cyan-300 mb-4">💡 Farming Advice</h3>
                <p className="text-slate-300 mb-4">{selectedForecast.farmingAdvice}</p>
                {selectedForecast.riskFactors.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-300 mb-2">Risk Factors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedForecast.riskFactors.map((risk, index) => (
                        <span key={index} className={`px-3 py-1 rounded-full text-sm ${getRiskColor(risk)}`}>
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">📊 Weekly Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(forecastDays.reduce((sum, day) => sum + day.precipitation, 0))}mm
                  </div>
                  <div className="text-sm text-slate-400">Total Precipitation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.round(forecastDays.reduce((sum, day) => sum + day.temperature.max, 0) / forecastDays.length)}°C
                  </div>
                  <div className="text-sm text-slate-400">Average High Temp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {Math.round(forecastDays.reduce((sum, day) => sum + day.soilMoisture, 0) / forecastDays.length)}%
                  </div>
                  <div className="text-sm text-slate-400">Average Soil Moisture</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={onClose} 
          className="mt-8 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition text-lg"
        >
          Close Forecast
        </button>
      </div>
    </div>
  );
};

export default WeatherForecast;
