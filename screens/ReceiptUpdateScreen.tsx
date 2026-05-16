
import React, { useState } from 'react';

interface ReceiptUpdateScreenProps {
  estimatedTotal: number;
  onComplete: (total: number) => void;
}

const ReceiptUpdateScreen: React.FC<ReceiptUpdateScreenProps> = ({ estimatedTotal, onComplete }) => {
  const [finalTotal, setFinalTotal] = useState(estimatedTotal.toFixed(2));

  return (
    <div className="flex items-center justify-center py-8 sm:py-12 animate-fadeIn">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-4xl mx-auto">
          🧾
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trip Summary</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter the final amount from your receipt to update your budget and Home Inventory.</p>
        </div>

        <div className="space-y-4">
          <div className="relative group">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400 group-focus-within:text-blue-500 transition-colors">$</span>
            <input
              type="number"
              step="0.01"
              value={finalTotal}
              onChange={(e) => setFinalTotal(e.target.value)}
              className="w-full pl-14 pr-4 py-6 text-4xl font-black bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-3xl outline-none text-center text-gray-900 dark:text-white transition-all shadow-inner"
            />
          </div>
          <div className="flex justify-between items-center px-2 text-sm">
            <span className="text-gray-500 uppercase font-bold tracking-tighter">Estimated Trip Total:</span>
            <span className="font-bold text-gray-900 dark:text-white">${estimatedTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-xs text-left text-blue-700 dark:text-blue-300">
          <p className="font-bold mb-1 italic">Pro Tip:</p>
          <p>Saving this will mark all purchased items as "OK" in your Home Inventory and subtract the amount from your weekly $60 budget.</p>
        </div>

        <button
          onClick={() => onComplete(parseFloat(finalTotal) || 0)}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95 transform"
        >
          Complete & Save
        </button>
      </div>
    </div>
  );
};

export default ReceiptUpdateScreen;
