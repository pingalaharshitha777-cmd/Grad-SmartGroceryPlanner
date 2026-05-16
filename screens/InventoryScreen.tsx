
import React, { useState } from 'react';
import { InventoryItem, Status } from '../types';
import { CATEGORIES } from '../constants';

interface InventoryScreenProps {
  inventory: InventoryItem[];
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
  onDelete: (id: string) => void;
  onGenerateList: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ inventory, onAdd, onUpdate, onDelete, onGenerateList }) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Other', quantity: 0, unit: '', threshold: 1 });

  const handleAdd = () => {
    if (!newItem.name || !newItem.unit) return;
    onAdd(newItem);
    setShowModal(false);
    setNewItem({ name: '', category: 'Other', quantity: 0, unit: '', threshold: 1 });
  };

  const getStatus = (item: InventoryItem): Status => (item.quantity < item.threshold ? 'Low' : 'OK');

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Home Inventory (What I Already Have)</h2>
          <p className="text-gray-600 dark:text-gray-400">Track staples and thresholds to automate lists.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 sm:flex-none bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            + Add Item
          </button>
          <button
            onClick={onGenerateList}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all"
          >
            Generate List
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {inventory.map((item) => {
              const status = getStatus(item);
              return (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdate(item.id, { quantity: Number(e.target.value) })}
                        className="w-20 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.unit}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">Threshold: {item.threshold}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      status === 'Low' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 dark:border-gray-700 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                <input
                  autoFocus
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  placeholder="e.g. Rice"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Unit</label>
                  <input
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newItem.unit}
                    onChange={e => setNewItem({...newItem, unit: e.target.value})}
                    placeholder="e.g. kg, cans"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Initial Qty</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newItem.quantity}
                    onChange={e => setNewItem({...newItem, quantity: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Threshold</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newItem.threshold}
                    onChange={e => setNewItem({...newItem, threshold: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryScreen;
