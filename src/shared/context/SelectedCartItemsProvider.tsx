import { createContext, useState, useEffect } from 'react';
import { CartItem } from '../type/cart';
import { useCartItemsContext } from './useCartItemsContext';

interface SelectedCartItemsContextType {
  SelectedCartItemsItems: CartItem[];
  addSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
}

export const SelectedCartItemsContext = createContext<SelectedCartItemsContextType | undefined>(undefined);

interface SelectedCartItemsProviderProps {
  children: React.ReactNode;
}

export const SelectedCartItemsProvider = ({ children }: SelectedCartItemsProviderProps) => {
  const { cartItems } = useCartItemsContext();
  const [SelectedCartItemsItems, setSelectedCartItemsItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setSelectedCartItemsItems((prev) =>
      prev.map((selectedItem) => {
        const updatedItem = cartItems.find((item) => item.id === selectedItem.id);
        return updatedItem ? updatedItem : selectedItem;
      })
    );
  }, [cartItems]);

  const addSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItemsItems((prevItems) => [...prevItems, cartItem]);
  };

  const removeSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItemsItems((prevItems) => prevItems.filter((item) => item.id !== cartItem.id));
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItemsItems(cartItems);
  };

  return (
    <SelectedCartItemsContext.Provider
      value={{
        SelectedCartItemsItems,
        addSelectedCartItem,
        addAllCartItemsInSelected,
        removeSelectedCartItem,
      }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
