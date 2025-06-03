import { createContext, useState } from "react";
import { CartItem } from "../types/type";
import { useFetchCartItems } from "../hooks/useFetchCartItems";

interface CartItemContext {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedItem: Set<unknown>;
  handleSelectedItem: (newSet: Set<unknown>) => void;
  isLoading: boolean;
  fetchError: string;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState(new Set());

  const { isLoading, fetchError } = useFetchCartItems(setCartItems);

  const handleSelectedItem = (newSet: Set<unknown>) => {
    return setSelectedItem(newSet);
  };

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        setCartItems,
        selectedItem,
        handleSelectedItem,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
