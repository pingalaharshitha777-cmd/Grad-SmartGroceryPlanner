
import React from 'react';
// Fix: Import ListItem and GroceryList instead of GroceryItem
import { ListItem, Store, GroceryList } from '../types';

interface ShoppingTripScreenProps {
  store: Store;
  // Fix: Align props with App.tsx usage
  list: GroceryList;
  onTogglePurchased: (id: string) => void;
  onFinish: () => void;
}

const ShoppingTripScreen: React.FC<ShoppingTripScreenProps> = ({ store, list, onTogglePurchased, onFinish }) => {
  // Only items that were marked as needed are active for this trip
  const tripItems = list.items.filter(i => i.needed);

  const purchasedCount = tripItems.filter(i => i.purchased).length;
  // Fix: Use estPrice and quantity for total
  const runningTotal = tripItems.reduce((acc, i) => i.purchased ? acc + (i.estPrice * i.qty) : acc, 0);

  // Group items by category
  const categories = Array.from(new Set(tripItems.map(i => i.category)));

  return (
    <div className="space-y-6 animate-fadeIn pb-24">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Trip @ {store.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">Progress: {purchasedCount} of {tripItems.length} items</p>
        </div>
        <div className="text-right w-full sm:w-auto bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
          <p className="text-xs text-blue-500 uppercase font-bold tracking-widest">Running Total</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${runningTotal.toFixed(2)}</p>
        </div>
      </header>

      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat} className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{cat}</h3>
            <div className="space-y-2">
              {tripItems.filter(i => i.category === cat).map(item => (
                <div
                  key={item.id}
                  // Fix: Use onTogglePurchased from props
                  onClick={() => onTogglePurchased(item.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    item.purchased
                      ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800 opacity-60 scale-[0.98]'
                      : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                      item.purchased
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    }`}>
                      {item.purchased && '✓'}
                    </div>
                    <span className={`font-medium text-gray-900 dark:text-white ${item.purchased ? 'line-through text-gray-500' : ''}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Fix: Use estPrice instead of estimatedPrice */}
                     <span className={`text-sm font-semibold ${item.purchased ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                      ${item.estPrice.toFixed(2)}
                    </span>
                    {item.purchased && <span className="text-[10px] bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded uppercase font-bold">In Basket</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 z-20">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{purchasedCount} of {tripItems.length} items marked purchased</p>
            <p className="text-xs text-gray-500">Running total reflects basket items only.</p>
          </div>
          <div className="w-full sm:w-auto">
            <button
              onClick={onFinish}
              disabled={purchasedCount === 0}
              className={`w-full sm:w-auto px-12 py-3 rounded-xl font-bold transition-all shadow-lg ${
                purchasedCount === 0
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }`}
            >
              Finish Trip
            </button>
            {purchasedCount === 0 && (
               <p className="mt-1 text-[10px] text-center text-gray-400">Mark items purchased to finish</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingTripScreen;
