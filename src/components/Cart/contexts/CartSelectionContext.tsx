import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { useCartDataContext } from "./CartDataContext";
import { CartItem } from "@/type/CartItem";

interface CartSelectionContextValue {
  selectedCartIds: Set<string>;
  handleSelectCartItem: (id: string) => void;
  handleSelectAllCartItems: () => void;
  selectedCartItemsLength: number;
  isAllSelected: boolean;
  getSelectedCartItems: () => CartItem[];
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

export const useSelectedCartItems = () => {
  const { selectedCartIds } = useCartSelectionContext();
  const { cartItemsData } = useCartDataContext();

  return useMemo(
    () => cartItemsData.filter((item) => selectedCartIds.has(item.id)),
    [cartItemsData, selectedCartIds]
  );
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
  } = useCartSelection(cartItemsData);

  const contextValue: CartSelectionContextValue = {
    selectedCartIds: selectedIds,
    handleSelectCartItem: toggleOne,
    handleSelectAllCartItems: toggleAll,
    selectedCartItemsLength: selectedItemsLength,
    isAllSelected,
    getSelectedCartItems: () =>
      cartItemsData.filter((item) => selectedIds.has(item.id)),
  };

  return (
    <CartSelectionContext.Provider value={contextValue}>
      {children}
    </CartSelectionContext.Provider>
  );
};
