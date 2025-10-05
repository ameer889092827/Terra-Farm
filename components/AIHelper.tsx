
import React from 'react';
import { FarmAnalysis } from '../types';

interface AIHelperProps {
  isLoading: boolean;
  onAnalyze: () => void;
  analysis: FarmAnalysis | null;
}

const AIHelper: React.FC<AIHelperProps> = ({ isLoading, onAnalyze, analysis }) => {
  return (
    <div className="bg-slate-900/50 p-4 rounded-lg flex flex-col gap-3 ring-1 ring-slate-700">
      <div className="flex gap-4 items-start">
        <div className="text-5xl flex-shrink-0 pt-1">🤖</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-green-300">Terra AI</h3>
          <div className="text-sm text-slate-300 mt-2 min-h-[60px]">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <span className="ml-2">Analyzing...</span>
              </div>
            ) : (
              <>
                <p className="mb-2">{analysis?.summary || "Welcome! Click 'Analyze Farm' for a detailed report."}</p>
                {analysis?.recommendations && (
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {analysis.recommendations.map((rec, i) => <li key={i}>{rec.replace(/^- /, '')}</li>)}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <button 
        onClick={onAnalyze} 
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:cursor-wait"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Farm'}
      </button>
    </div>
  );
};

export default AIHelper;
