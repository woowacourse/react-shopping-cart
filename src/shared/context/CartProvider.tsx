import { createContext, useMemo, useState } from 'react';
import { CartItem } from '../types/cart';

interface CartContextType {
  cartItems: CartItem[];
  updateCartItems: (item: CartItem[]) => void;
  updateCartItemQuantity: (item: CartItem, quantity: number) => void;
  selectedCartItems: CartItem[];
  updateSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

  const updateCartItems = (cartItems: CartItem[]) => {
    setCartItems(cartItems);
  };

  const updateCartItemQuantity = (cartItem: CartItem, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => (item.id === cartItem.id ? { ...item, quantity } : item));
    });
  };

  const updateSelectedCartItem = (cartItem: CartItem, quantity?: number) => {
    setSelectedCartItems((prevItems) => {
      const existing = prevItems.some((item) => item.id === cartItem.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: quantity !== undefined ? quantity : item.quantity } : item
        );
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

  const value = useMemo(
    () => ({
      cartItems,
      updateCartItems,
      updateCartItemQuantity,
      selectedCartItems,
      updateSelectedCartItem,
      addAllCartItemsInSelected,
      removeSelectedCartItem,
    }),
    [cartItems, selectedCartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
