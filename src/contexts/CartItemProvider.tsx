import { createContext, useState, useEffect } from "react";
import { CartItem } from "../types/type";
import { useFetchCartItems } from "../hooks/useFetchCartItems";
import { useLocalStorageSet } from "../hooks/useLocalStorageSet";
import { SELECTED_ITEMS_KEY } from "../constants";

interface CartItemContext {
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

export const CartItemContext = createContext<CartItemContext | null>(null);

export const CartItemProvider = ({ children }: CartItemProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { value: selectedItem, updateValue: handleSelectedItem } =
    useLocalStorageSet<number>(SELECTED_ITEMS_KEY, new Set<number>());

  const { isLoading, fetchError } = useFetchCartItems(setCartItems);

  useEffect(() => {
    if (cartItems.length > 0 && selectedItem.size > 0) {
      const validCartItemIds = new Set(cartItems.map((item) => item.id));
      const validSelectedItems = new Set(
        Array.from(selectedItem).filter((id: number) =>
          validCartItemIds.has(id)
        )
      );

      if (validSelectedItems.size !== selectedItem.size) {
        handleSelectedItem(validSelectedItems);
      }
    }
  }, [cartItems, selectedItem, handleSelectedItem]);

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
