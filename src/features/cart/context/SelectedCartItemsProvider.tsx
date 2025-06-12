import { createContext, useState, useEffect } from 'react';
import { CartItem } from '../types/cart';
import { useCartItemsContext } from './useCartItemsContext';

const SELECTED_CART_ITEMS_KEY = 'selectedCartItems';

const loadSelectedCartItemsFromStorage = (): CartItem[] | null => {
  try {
    const stored = localStorage.getItem(SELECTED_CART_ITEMS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('localStorage에서 데이터를 불러오는데 실패했습니다:', error);
    return null;
  }
};

const saveSelectedCartItemsToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(SELECTED_CART_ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('localStorage에 데이터를 저장하는데 실패했습니다:', error);
  }
};

interface SelectedCartItemsContextType {
  selectedCartItems: CartItem[];
  addSelectedCartItem: (item: CartItem) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
}

export const SelectedCartItemsContext = createContext<SelectedCartItemsContextType | undefined>(undefined);

interface SelectedCartItemsProviderProps {
  children: React.ReactNode;
}

export const SelectedCartItemsProvider = ({ children }: SelectedCartItemsProviderProps) => {
  const { cartItems } = useCartItemsContext();
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init && cartItems.length > 0) {
      const storedItems = loadSelectedCartItemsFromStorage();
      storedItems ? setSelectedCartItems(storedItems) : setSelectedCartItems(cartItems);

      setInit(true);
    }
  }, [cartItems, init]);

  useEffect(() => {
    setSelectedCartItems((prev) =>
      prev.map((selectedItem) => {
        const updatedItem = cartItems.find((item) => item.id === selectedItem.id);
        return updatedItem ? updatedItem : selectedItem;
      })
    );
  }, [cartItems]);

  const addSelectedCartItem = (cartItem: CartItem) => {
    const newItems = [...selectedCartItems, cartItem];
    setSelectedCartItems(newItems);
    saveSelectedCartItemsToStorage(newItems);
  };

  const removeSelectedCartItem = (cartItem: CartItem) => {
    const newItems = selectedCartItems.filter((item) => item.id !== cartItem.id);
    setSelectedCartItems(newItems);
    saveSelectedCartItemsToStorage(newItems);
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItems(cartItems);
    saveSelectedCartItemsToStorage(cartItems);
  };

  return (
    <SelectedCartItemsContext.Provider
      value={{
        selectedCartItems,
        addSelectedCartItem,
        addAllCartItemsInSelected,
        removeSelectedCartItem,
      }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
