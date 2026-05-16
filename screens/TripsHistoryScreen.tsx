
import React, { useState } from 'react';
import { TripRecord } from '../types';

interface TripsHistoryScreenProps {
  trips: TripRecord[];
}

const TripsHistoryScreen: React.FC<TripsHistoryScreenProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<TripRecord | null>(null);

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
        <div className="text-6xl mb-4">⌛</div>
        <h2 className="text-2xl font-bold mb-2">No History Yet</h2>
        <p className="text-gray-500 dark:text-gray-400">Complete your first trip to see records here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trips History</h2>
        <p className="text-gray-600 dark:text-gray-400">Track your past spending and shopping frequency.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedTrip?.id === trip.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-md'
                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{trip.storeName}</h4>
                  <p className="text-xs text-gray-500">{new Date(trip.completedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400">${trip.actualTotal.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{trip.purchasedItemsCount} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTrip ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl h-fit sticky top-8 animate-fadeIn">
            <h3 className="text-xl font-bold mb-2">{selectedTrip.storeName}</h3>
            <p className="text-sm text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
              {new Date(selectedTrip.completedAt).toLocaleString()}
            </p>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Purchased Items</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTrip.purchasedItems.map((item, idx) => (
                    <span key={idx} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Items Planned</p>
                  <p className="text-xl font-bold">{selectedTrip.itemsPlannedCount}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-2xl">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Fulfillment</p>
                  <p className="text-xl font-bold text-green-600">
                    {Math.round((selectedTrip.purchasedItemsCount / selectedTrip.itemsPlannedCount) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-12 text-gray-400">
            <p>Select a trip to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsHistoryScreen;
