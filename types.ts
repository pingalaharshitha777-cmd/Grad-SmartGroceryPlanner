
export type Status = 'Low' | 'OK';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  threshold: number;
  lastPurchasedAt?: string;
}

export interface ListItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unit: string;
  estPrice: number;
  needed: boolean;
  purchased: boolean;
}

export interface GroceryList {
  id: string;
  name: string;
  createdAt: string;
  budget: number;
  estimatedTotal: number;
  items: ListItem[];
}

export interface Store {
  id: string;
  name: string;
  distanceMiles: number;
  priceLevel: 1 | 2 | 3;
  notes: string;
  icon: string;
}

export interface TripRecord {
  id: string;
  groceryListId: string;
  storeName: string;
  startedAt: string;
  completedAt: string;
  actualTotal: number;
  purchasedItemsCount: number;
  itemsPlannedCount: number;
  purchasedItems: string[]; // names of items
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  GROCERY_LIST = 'GROCERY_LIST',
  STORES = 'STORES',
  SHOPPING_TRIP = 'SHOPPING_TRIP',
  RECEIPT_UPDATE = 'RECEIPT_UPDATE',
  TRIPS_HISTORY = 'TRIPS_HISTORY'
}

export interface AppState {
  screen: AppScreen;
  budget: number;
  inventory: InventoryItem[];
  currentList: GroceryList | null;
  stores: Store[];
  trips: TripRecord[];
  activeStore: Store | null;
  confirmationMessage: string | null;
}
