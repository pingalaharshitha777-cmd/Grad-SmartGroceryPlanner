
import React from 'react';
import { Store } from '../types';

interface StoresScreenProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
  canStart: boolean;
}

const StoresScreen: React.FC<StoresScreenProps> = ({ stores, onSelectStore, canStart }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Where are you shopping?</h2>
        <p className="text-gray-600 dark:text-gray-400">Choose a store to optimize your checklist for this trip.</p>
      </header>

      {!canStart && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-4 rounded-2xl text-orange-700 dark:text-orange-300 text-sm">
          ⚠️ You need to generate a Grocery List before starting a trip.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            onClick={() => canStart && onSelectStore(store)}
            className={`bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group transition-all transform hover:-translate-y-1 ${
              canStart ? 'cursor-pointer hover:border-blue-500 hover:shadow-xl' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
              {store.icon}
            </div>
            <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{store.name}</h3>
            <p className="text-xs text-gray-400 mb-4">{store.distanceMiles} miles away • {'$'.repeat(store.priceLevel)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex-1 leading-relaxed italic">
              "{store.notes}"
            </p>
            <button 
              disabled={!canStart}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                canStart 
                  ? 'bg-gray-50 dark:bg-gray-700 group-hover:bg-blue-600 group-hover:text-white text-gray-600 dark:text-gray-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}
            >
              Start Shopping Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoresScreen;
