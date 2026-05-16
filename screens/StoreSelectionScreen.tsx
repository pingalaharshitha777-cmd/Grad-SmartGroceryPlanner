
import React from 'react';
// Fix: Import INITIAL_STORES instead of STORES
import { INITIAL_STORES } from '../constants';
import { Store } from '../types';

interface StoreSelectionScreenProps {
  onSelectStore: (store: Store) => void;
}

const StoreSelectionScreen: React.FC<StoreSelectionScreenProps> = ({ onSelectStore }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Start Your Shopping Trip</h2>
        <p className="text-gray-600 dark:text-gray-400">Choose a store to optimize your checklist and save on your budget.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fix: Use INITIAL_STORES instead of STORES */}
        {INITIAL_STORES.map((store) => (
          <div
            key={store.id}
            onClick={() => onSelectStore(store)}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
              {store.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{store.name}</h3>
            {/* Fix: Use store.notes instead of store.description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex-1 leading-relaxed">
              {store.notes}
            </p>
            <button className="w-full py-3 bg-gray-50 dark:bg-gray-700 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-sm font-bold transition-all text-gray-600 dark:text-gray-300">
              Select Store
            </button>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-6 rounded-2xl text-center">
        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
          Selecting a store helps us estimate distances and aisle organization for your list.
        </p>
      </div>
    </div>
  );
};

export default StoreSelectionScreen;
