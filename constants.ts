
import { InventoryItem, Store } from './types';

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Rice', category: 'Grains', quantity: 1, unit: 'kg', threshold: 2 },
  { id: '2', name: 'Eggs', category: 'Dairy', quantity: 3, unit: 'pcs', threshold: 6 },
  { id: '3', name: 'Olive Oil', category: 'Cooking', quantity: 100, unit: 'ml', threshold: 250 },
  { id: '4', name: 'Salt', category: 'Cooking', quantity: 500, unit: 'g', threshold: 100 },
  { id: '5', name: 'Black Beans', category: 'Canned Goods', quantity: 2, unit: 'cans', threshold: 2 },
];

export const INITIAL_STORES: Store[] = [
  { id: 's1', name: 'Budget Mart', distanceMiles: 1.2, priceLevel: 1, notes: 'Best for bulk grains.', icon: '🛒' },
  { id: 's2', name: 'Fresh Corner', distanceMiles: 0.8, priceLevel: 2, notes: 'Great organic produce.', icon: '🥬' },
  { id: 's3', name: 'Campus Co-op', distanceMiles: 0.3, priceLevel: 2, notes: 'Quick trip essentials.', icon: '🏫' },
];

export const CATEGORIES = ['Produce', 'Dairy', 'Grains', 'Cooking', 'Canned Goods', 'Household', 'Other'];

export const ESSENTIAL_SUGGESTIONS = [
  { name: 'Milk', category: 'Dairy', estPrice: 4.50, unit: 'gal' },
  { name: 'Bananas', category: 'Produce', estPrice: 2.00, unit: 'bunch' },
  { name: 'Onions', category: 'Produce', estPrice: 3.50, unit: 'bag' },
  { name: 'Spinach', category: 'Produce', estPrice: 4.00, unit: 'bag' },
  { name: 'Yogurt', category: 'Dairy', estPrice: 5.50, unit: 'tub' },
  { name: 'Coffee', category: 'Other', estPrice: 12.00, unit: 'bag' },
  { name: 'Toothpaste', category: 'Household', estPrice: 5.00, unit: 'tube' },
  { name: 'Trash Bags', category: 'Household', estPrice: 8.00, unit: 'box' },
];

export const DEFAULT_PRICES: Record<string, number> = {
  'Rice': 3.00,
  'Eggs': 4.00,
  'Olive Oil': 6.00,
  'Salt': 2.00,
  'Black Beans': 1.50,
  'Paper Towels': 5.00,
};
