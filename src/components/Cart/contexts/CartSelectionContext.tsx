import { PropsWithChildren, createContext, useContext } from "react";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { useCartDataContext } from "./CartDataContext";
import { CartItem } from "@/type/CartItem";

interface CartSelectionContextValue {
  selectedCartIds: Set<string>;
  handleSelectCartItem: (id: string) => void;
  handleSelectAllCartItems: () => void;
  selectedCartItemsLength: number;
  isAllSelected: boolean;
  selectedCartItems: CartItem[];
}

const CartSelectionContext = createContext<CartSelectionContextValue | null>(
  null
);

export const useCartSelectionContext = () => {
  const context = useContext(CartSelectionContext);
  if (!context) {
    throw new Error(
      "useCartSelectionContext must be used within CartSelectionProvider"
    );
  }
  return context;
};

interface CartSelectionProviderProps extends PropsWithChildren {}

export const CartSelectionProvider = ({
  children,
}: CartSelectionProviderProps) => {
  const { cartItemsData } = useCartDataContext();

  const {
    selectedIds,
    toggleOne,
    toggleAll,
    selectedItemsLength,
    isAllSelected,
    selectedItems,
  } = useCartSelection(cartItemsData);

  const contextValue: CartSelectionContextValue = {
    selectedCartIds: selectedIds,
    handleSelectCartItem: toggleOne,
    handleSelectAllCartItems: toggleAll,
    selectedCartItemsLength: selectedItemsLength,
    isAllSelected,
    selectedCartItems: selectedItems,
  };

  return (
    <CartSelectionContext.Provider value={contextValue}>
      {children}
    </CartSelectionContext.Provider>
  );
};
