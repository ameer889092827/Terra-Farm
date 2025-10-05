
import React, { useState, useEffect } from 'react';
import { TileState, NasaData } from '../types';
import { getEducationalContent } from '../services/geminiService';

interface InspectModalProps {
  tile: TileState | null;
  nasaData: NasaData;
  onClose: () => void;
}

const InspectModal: React.FC<InspectModalProps> = ({ tile, nasaData, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (tile && tile.crop) {
      setIsLoading(true);
      const fetchContent = async () => {
        try {
          const context = `User is inspecting a ${tile.crop?.name} plant. Provide a detailed crop profile and relevant process information based on its current state.`;
          const result = await getEducationalContent(context, tile.crop, tile, nasaData);
          setContent(result);
        } catch (error) {
          console.error("Failed to get educational content:", error);
          setContent("Error: Could not retrieve detailed information for this crop.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchContent();
    }
  }, [tile, nasaData]);
  
  if (!tile) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-5xl animate-spin">🛰️</div>
          <p className="mt-4 text-cyan-300">Analyzing crop with NASA data...</p>
        </div>
      );
    }
    // Basic markdown parsing for now. A library like 'marked' would be better for a real app.
    return (
      <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
    );
  };

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto ring-1 ring-cyan-500 shadow-2xl shadow-cyan-500/20 m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            {tile.crop?.icon || '🔬'} {tile.crop?.name || 'Plot'} Analysis
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl font-bold transition-colors"
          >
            &times;</button>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-lg min-h-[300px]">
          {renderContent()}
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition">
          Close
        </button>
      </div>
    </div>
  );
};

export default InspectModal;
