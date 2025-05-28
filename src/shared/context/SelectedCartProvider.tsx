import { createContext, useState } from 'react';
import { CartItem } from '../type/cart';

interface SelectedCartContextType {
  selectedCartItems: CartItem[];
  updateSelectedCartItems: (item: CartItem) => void;
  checkIfSelectedCartItem: (item: CartItem) => boolean;
}

export const SelectedCartContext = createContext<SelectedCartContextType | undefined>(undefined);

interface SelectedCartProviderProps {
  children: React.ReactNode;
}

export const SelectedCartProvider = ({ children }: SelectedCartProviderProps) => {
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const updateSelectedCartItems = (cartItem: CartItem) => {
    setSelectedCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      return [...prevItems, cartItem];
    });
  };

  const checkIfSelectedCartItem = (cartItem: CartItem) => {
    return selectedCartItems.findIndex((item) => item.id === cartItem.id) === -1 ? false : true;
  };

  return (
    <SelectedCartContext.Provider value={{ selectedCartItems, updateSelectedCartItems, checkIfSelectedCartItem }}>
      {children}
    </SelectedCartContext.Provider>
  );
};
