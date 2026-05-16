
import React from 'react';
import { AppScreen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, onToggleDarkMode, currentScreen, onNavigate }) => {
  const navItems = [
    { label: 'Dashboard', screen: AppScreen.DASHBOARD, icon: '📊' },
    { label: 'Home Inventory', screen: AppScreen.INVENTORY, icon: '🏠' },
    { label: 'Lists', screen: AppScreen.GROCERY_LIST, icon: '📝' },
    { label: 'Stores', screen: AppScreen.STORES, icon: '🏢' },
    { label: 'Trips History', screen: AppScreen.TRIPS_HISTORY, icon: '⏳' },
  ];

  const getIsActive = (screen: AppScreen) => {
    if (screen === AppScreen.DASHBOARD && currentScreen === AppScreen.DASHBOARD) return true;
    if (screen === AppScreen.INVENTORY && currentScreen === AppScreen.INVENTORY) return true;
    if (screen === AppScreen.GROCERY_LIST && currentScreen === AppScreen.GROCERY_LIST) return true;
    if (screen === AppScreen.STORES && (currentScreen === AppScreen.STORES || currentScreen === AppScreen.SHOPPING_TRIP)) return true;
    if (screen === AppScreen.TRIPS_HISTORY && currentScreen === AppScreen.TRIPS_HISTORY) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Grad Groceries</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.screen)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                getIsActive(item.screen)
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Weekly Goal</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Stay under $60.00/week</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center space-x-4 md:hidden">
             <button onClick={() => onNavigate(AppScreen.DASHBOARD)} className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</button>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold">HP</div>
              <span className="text-sm font-medium hidden sm:inline text-gray-700 dark:text-gray-200">Harshitha Pingala</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
