
import React, { useState, useEffect } from 'react';
import { AppScreen, AppState, InventoryItem, ListItem, GroceryList, Store, TripRecord } from './types';
import { INITIAL_INVENTORY, INITIAL_STORES, DEFAULT_PRICES, ESSENTIAL_SUGGESTIONS } from './constants';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import InventoryScreen from './screens/InventoryScreen';
import GroceryListScreen from './screens/GroceryListScreen';
import StoresScreen from './screens/StoresScreen';
import ShoppingTripScreen from './screens/ShoppingTripScreen';
import ReceiptUpdateScreen from './screens/ReceiptUpdateScreen';
import TripsHistoryScreen from './screens/TripsHistoryScreen';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [state, setState] = useState<AppState>({
    screen: AppScreen.LOGIN,
    budget: 60.00,
    inventory: INITIAL_INVENTORY,
    currentList: null,
    stores: INITIAL_STORES,
    trips: [],
    activeStore: null,
    confirmationMessage: null,
  });

  const setScreen = (screen: AppScreen) => {
    setState(prev => ({ ...prev, screen, confirmationMessage: null }));
  };

  // Inventory CRUD
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    setState(prev => ({ ...prev, inventory: [...prev.inventory, newItem] }));
  };

  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const deleteInventoryItem = (id: string) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== id)
    }));
  };

  // List Generation
  const generateGroceryList = () => {
    const lowItems = state.inventory.filter(item => item.quantity < item.threshold);
    
    const items: ListItem[] = lowItems.map(item => ({
      id: `list-${item.id}`,
      name: item.name,
      category: item.category,
      qty: Math.max(1, Math.ceil(item.threshold - item.quantity)),
      unit: item.unit,
      estPrice: DEFAULT_PRICES[item.name] || 4.00,
      needed: true,
      purchased: false
    }));

    // Add suggested essentials if not present
    ESSENTIAL_SUGGESTIONS.slice(0, 3).forEach(suggestion => {
      if (!items.find(i => i.name === suggestion.name)) {
        items.push({
          id: `suggest-${suggestion.name}`,
          name: suggestion.name,
          category: suggestion.category,
          qty: 1,
          unit: suggestion.unit,
          estPrice: suggestion.estPrice,
          needed: true,
          purchased: false
        });
      }
    });

    const newList: GroceryList = {
      id: `list-${Date.now()}`,
      name: `Weekly Plan ${new Date().toLocaleDateString()}`,
      createdAt: new Date().toISOString(),
      budget: 60.00,
      estimatedTotal: items.reduce((acc, i) => acc + (i.estPrice * i.qty), 0),
      items
    };

    setState(prev => ({ ...prev, currentList: newList, screen: AppScreen.GROCERY_LIST }));
  };

  // List Item CRUD
  const addListItem = (name: string, qty: number = 1) => {
    if (!state.currentList) return;
    const newItem: ListItem = {
      id: `manual-${Date.now()}`,
      name,
      category: 'Other',
      qty,
      unit: 'pkg',
      estPrice: 5.00,
      needed: true,
      purchased: false
    };
    const updatedItems = [...state.currentList.items, newItem];
    const updatedTotal = updatedItems.reduce((acc, i) => i.needed ? acc + (i.estPrice * i.qty) : acc, 0);
    setState(prev => ({
      ...prev,
      currentList: prev.currentList ? { ...prev.currentList, items: updatedItems, estimatedTotal: updatedTotal } : null
    }));
  };

  const updateListItem = (id: string, updates: Partial<ListItem>) => {
    if (!state.currentList) return;
    const updatedItems = state.currentList.items.map(i => i.id === id ? { ...i, ...updates } : i);
    const updatedTotal = updatedItems.reduce((acc, i) => i.needed ? acc + (i.estPrice * i.qty) : acc, 0);
    setState(prev => ({
      ...prev,
      currentList: prev.currentList ? { ...prev.currentList, items: updatedItems, estimatedTotal: updatedTotal } : null
    }));
  };

  const deleteListItem = (id: string) => {
    if (!state.currentList) return;
    const updatedItems = state.currentList.items.filter(i => i.id !== id);
    const updatedTotal = updatedItems.reduce((acc, i) => i.needed ? acc + (i.estPrice * i.qty) : acc, 0);
    setState(prev => ({
      ...prev,
      currentList: prev.currentList ? { ...prev.currentList, items: updatedItems, estimatedTotal: updatedTotal } : null
    }));
  };

  // Trip Flow
  const startShoppingTrip = (store: Store) => {
    setState(prev => ({ ...prev, activeStore: store, screen: AppScreen.SHOPPING_TRIP }));
  };

  const completeTripAndSave = (actualTotal: number) => {
    if (!state.currentList || !state.activeStore) return;

    const purchasedList = state.currentList.items.filter(i => i.purchased);
    
    // 1. Update Inventory
    const updatedInventory = state.inventory.map(inv => {
      const match = purchasedList.find(p => p.name === inv.name);
      if (match) {
        return {
          ...inv,
          quantity: inv.quantity + match.qty,
          lastPurchasedAt: new Date().toISOString()
        };
      }
      return inv;
    });

    // 2. Create Trip Record
    const newTrip: TripRecord = {
      id: `trip-${Date.now()}`,
      groceryListId: state.currentList.id,
      storeName: state.activeStore.name,
      startedAt: state.currentList.createdAt, // approximation
      completedAt: new Date().toISOString(),
      actualTotal,
      purchasedItemsCount: purchasedList.length,
      itemsPlannedCount: state.currentList.items.length,
      purchasedItems: purchasedList.map(p => p.name)
    };

    setState(prev => ({
      ...prev,
      inventory: updatedInventory,
      trips: [newTrip, ...prev.trips],
      budget: prev.budget - actualTotal,
      currentList: null,
      activeStore: null,
      screen: AppScreen.DASHBOARD,
      confirmationMessage: `Trip complete! $${actualTotal.toFixed(2)} spent.`
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (state.screen) {
      case AppScreen.LOGIN: return <LoginScreen onLogin={() => setScreen(AppScreen.DASHBOARD)} />;
      case AppScreen.DASHBOARD: return <DashboardScreen state={state} onReviewInventory={() => setScreen(AppScreen.INVENTORY)} onGenerateList={generateGroceryList} />;
      case AppScreen.INVENTORY: return (
        <InventoryScreen
          inventory={state.inventory}
          onAdd={addInventoryItem}
          onUpdate={updateInventoryItem}
          onDelete={deleteInventoryItem}
          onGenerateList={generateGroceryList}
        />
      );
      case AppScreen.GROCERY_LIST: return (
        <GroceryListScreen
          list={state.currentList}
          onAddItem={addListItem}
          onUpdateItem={updateListItem}
          onDeleteItem={deleteListItem}
          onStartTrip={() => setScreen(AppScreen.STORES)}
        />
      );
      case AppScreen.STORES: return (
        <StoresScreen 
          stores={state.stores} 
          onSelectStore={startShoppingTrip} 
          canStart={!!state.currentList}
        />
      );
      case AppScreen.SHOPPING_TRIP: return (
        <ShoppingTripScreen
          store={state.activeStore!}
          list={state.currentList!}
          onTogglePurchased={(id) => updateListItem(id, { purchased: !state.currentList?.items.find(i => i.id === id)?.purchased })}
          onFinish={() => setScreen(AppScreen.RECEIPT_UPDATE)}
        />
      );
      case AppScreen.RECEIPT_UPDATE: return (
        <ReceiptUpdateScreen
          estimatedTotal={state.currentList?.items.reduce((acc, i) => i.purchased ? acc + (i.estPrice * i.qty) : acc, 0) || 0}
          onComplete={completeTripAndSave}
        />
      );
      case AppScreen.TRIPS_HISTORY: return <TripsHistoryScreen trips={state.trips} />;
      default: return null;
    }
  };

  if (state.screen === AppScreen.LOGIN) return <LoginScreen onLogin={() => setScreen(AppScreen.DASHBOARD)} />;

  return (
    <Layout
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
      currentScreen={state.screen}
      onNavigate={setScreen}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
