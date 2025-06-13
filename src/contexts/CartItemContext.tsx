import { createContext, useContext, useState } from "react";
import { CartItem } from "../types/type";
import { useFetchCartItems } from "../hooks/useFetchCartItems";
import { useLocalStorageSet } from "../hooks/useLocalStorageSet";
import { useCartItemValidation } from "../hooks/useCartItemValidation";
import { SELECTED_ITEMS_KEY } from "../constants";

interface CartItemContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedItems: Set<number>;
  addSelectedItem: (itemId: number) => void;
  removeSelectedItem: (itemId: number) => void;
  toggleSelectedItem: (itemId: number) => void;
  selectAllItems: () => void;
  clearSelectedItems: () => void;
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

  const { value: selectedItems, updateValue: handleSelectedItems } =
    useLocalStorageSet<number>(SELECTED_ITEMS_KEY, new Set<number>());

  const { isLoading, fetchError } = useFetchCartItems(setCartItems);

  useCartItemValidation(cartItems, selectedItems, handleSelectedItems);

  const addSelectedItem = (itemId: number) => {
    const newSet = new Set(selectedItems);
    newSet.add(itemId);
    handleSelectedItems(newSet);
  };

  const removeSelectedItem = (itemId: number) => {
    const newSet = new Set(selectedItems);
    newSet.delete(itemId);
    handleSelectedItems(newSet);
  };

  const toggleSelectedItem = (itemId: number) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    handleSelectedItems(newSet);
  };

  const selectAllItems = () => {
    const allItemIds = cartItems.map((item) => item.id);
    handleSelectedItems(new Set(allItemIds));
  };

  const clearSelectedItems = () => {
    handleSelectedItems(new Set());
  };

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        setCartItems,
        selectedItems,
        addSelectedItem,
        removeSelectedItem,
        toggleSelectedItem,
        selectAllItems,
        clearSelectedItems,
        isLoading,
        fetchError,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
