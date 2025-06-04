import { createContext, useState } from 'react';
import { CartItem } from '../type/cart';

interface SelectedCartItemsContextType {
  SelectedCartItemsItems: CartItem[];
  updateSelectedCartItemsItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItemsItem: (item: CartItem) => void;
}

export const SelectedCartItemsContext = createContext<SelectedCartItemsContextType | undefined>(undefined);

interface SelectedCartItemsProviderProps {
  children: React.ReactNode;
}

export const SelectedCartItemsProvider = ({ children }: SelectedCartItemsProviderProps) => {
  const [SelectedCartItemsItems, setSelectedCartItemsItems] = useState<CartItem[]>([]);

  const updateSelectedCartItemsItem = (cartItem: CartItem, quantity?: number) => {
    setSelectedCartItemsItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity ?? 1;
        return updatedItems;
      }

      return [...prevItems, cartItem];
    });
  };

  const removeSelectedCartItemsItem = (cartItem: CartItem) => {
    setSelectedCartItemsItems((prevItems) => {
      return prevItems.filter((item) => item.id !== cartItem.id);
    });
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItemsItems(cartItems);
  };

  return (
    <SelectedCartItemsContext.Provider
      value={{
        SelectedCartItemsItems,
        updateSelectedCartItemsItem,
        addAllCartItemsInSelected,
        removeSelectedCartItemsItem,
      }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
