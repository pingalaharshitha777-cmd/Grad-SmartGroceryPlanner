
import React, { useState } from 'react';
import { GroceryList, ListItem } from '../types';

interface GroceryListScreenProps {
  list: GroceryList | null;
  onAddItem: (name: string, qty: number) => void;
  onUpdateItem: (id: string, updates: Partial<ListItem>) => void;
  onDeleteItem: (id: string) => void;
  onStartTrip: () => void;
}

const GroceryListScreen: React.FC<GroceryListScreenProps> = ({ list, onAddItem, onUpdateItem, onDeleteItem, onStartTrip }) => {
  const [manualName, setManualName] = useState('');
  const [manualQty, setManualQty] = useState(1);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualName.trim()) {
      onAddItem(manualName.trim(), manualQty);
      setManualName('');
      setManualQty(1);
    }
  };

  if (!list) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold mb-2">No Active List</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Generate one from your inventory to get started.</p>
      </div>
    );
  }

  const itemsNeeded = list.items.filter(i => i.needed);

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Grocery List</h2>
          <p className="text-gray-600 dark:text-gray-400">{list.name}</p>
        </div>
        <div className="text-right bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-blue-500 uppercase font-bold tracking-widest mb-1">Estimated Total</p>
          <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">${list.estimatedTotal.toFixed(2)}</p>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
            placeholder="Add manual item (e.g. Milk)..."
            value={manualName}
            onChange={e => setManualName(e.target.value)}
          />
          <div className="flex gap-3">
            <input
              type="number"
              className="w-20 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={manualQty}
              min="1"
              onChange={e => setManualQty(parseInt(e.target.value) || 1)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {list.items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border transition-all ${
                item.needed
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto mb-3 sm:mb-0">
                <input
                  type="checkbox"
                  checked={item.needed}
                  onChange={() => onUpdateItem(item.id, { needed: !item.needed })}
                  className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`font-bold text-gray-900 dark:text-white ${!item.needed ? 'line-through text-gray-400' : ''}`}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    className="w-16 px-2 py-1 bg-gray-50 dark:bg-gray-700 border-transparent rounded-lg text-sm font-bold text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 transition-all"
                    value={item.qty}
                    onChange={e => onUpdateItem(item.id, { qty: parseInt(e.target.value) || 1 })}
                  />
                  <span className="text-xs text-gray-400">{item.unit}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">$</span>
                  <input
                    type="number"
                    step="0.01"
                    className="w-20 px-2 py-1 bg-gray-50 dark:bg-gray-700 border-transparent rounded-lg text-sm font-bold text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 transition-all"
                    value={item.estPrice}
                    onChange={e => onUpdateItem(item.id, { estPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button
            onClick={onStartTrip}
            disabled={itemsNeeded.length === 0}
            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${
              itemsNeeded.length === 0
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Start Trip (Select Store)
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroceryListScreen;
