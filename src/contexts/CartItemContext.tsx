import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/type";
import { useFetchCartItems } from "../hooks/useFetchCartItems";
import { useLocalStorageSet } from "../hooks/useLocalStorageSet";
import { useCartItemValidation } from "../hooks/useCartItemValidation";
import { SELECTED_ITEMS_KEY } from "../constants";

interface CartItemContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedItem: Set<number>;
  handleSelectedItem: (newSet: Set<number>) => void;
  isLoading: boolean;
  fetchError: string;
}

interface CartItemProviderProps {
  children: React.ReactNode;
}

const CartItemContext = createContext<CartItemContextType | null>(null);

export const useCartItemContext = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error(
      "useCartItemContext must be used within a CartItemProvider"
    );
  }
  return context;
};

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { value: selectedItem, updateValue: handleSelectedItem } =
    useLocalStorageSet<number>(SELECTED_ITEMS_KEY, new Set<number>());

  const { isLoading, fetchError } = useFetchCartItems(setCartItems);

  useCartItemValidation(cartItems, selectedItem, handleSelectedItem);

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
