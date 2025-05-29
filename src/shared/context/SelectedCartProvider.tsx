import { createContext, useState } from 'react';
import { CartItem } from '../types/cart';

interface SelectedCartContextType {
  selectedCartItems: CartItem[];
  updateSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
}

export const SelectedCartContext = createContext<SelectedCartContextType | undefined>(undefined);

interface SelectedCartProviderProps {
  children: React.ReactNode;
}

export const SelectedCartProvider = ({ children }: SelectedCartProviderProps) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const updateSelectedCartItem = (cartItem: CartItem, quantity?: number) => {
    setSelectedCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity ?? 1;
        return updatedItems;
      }

      return [...prevItems, cartItem];
    });
  };

  const removeSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== cartItem.id);
    });
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItems(cartItems);
  };

  return (
    <SelectedCartContext.Provider
      value={{ selectedCartItems, updateSelectedCartItem, addAllCartItemsInSelected, removeSelectedCartItem }}
    >
      {children}
    </SelectedCartContext.Provider>
  );
};
