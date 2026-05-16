
import React from 'react';
import { AppState } from '../types';

interface DashboardScreenProps {
  state: AppState;
  onReviewInventory: () => void;
  onGenerateList: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ state, onReviewInventory, onGenerateList }) => {
  const lowItemsCount = state.inventory.filter(item => item.quantity < item.threshold).length;
  const budgetPercentage = (state.budget / 60) * 100;

  return (
    <div className="space-y-6 animate-fadeIn">
      {state.confirmationMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl flex items-center shadow-sm">
          <span className="mr-2">✅</span>
          {state.confirmationMessage}
        </div>
      )}

      <header>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-balance">Welcome back, Harshitha</h2>
        <p className="text-gray-600 dark:text-gray-400">Ready to plan your weekly groceries?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Budget</h3>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${state.budget.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(0, Math.min(100, budgetPercentage))}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current remaining budget: <strong>${state.budget.toFixed(2)}</strong> of $60.00
          </p>
        </div>

        {/* Low Inventory Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 text-xl">
              ⚠️
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Inventory Alert</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You have <span className="text-orange-600 dark:text-orange-400 font-bold">{lowItemsCount}</span> items running low
              </p>
            </div>
          </div>
          <button
            onClick={onReviewInventory}
            className="w-full py-2.5 px-4 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all font-bold text-sm"
          >
            Review Home Inventory
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-8 rounded-3xl shadow-xl shadow-blue-200 dark:shadow-none text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Automate Your List</h3>
          <p className="mb-6 text-blue-50 max-w-md">Generate a grocery list instantly based on your "Home Inventory (What I Already Have)".</p>
          <button
            onClick={onGenerateList}
            className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 transform"
          >
            Generate Grocery List
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default DashboardScreen;
