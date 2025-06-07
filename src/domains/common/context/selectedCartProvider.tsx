import { createContext, useContext, useMemo } from "react";

import { useSelectedCartIds } from "../../shopping-cart/hooks/useSelectedCartIds";
import { CartItemTypes } from "../../shopping-cart/types/cartItem";

interface SelectedCartContextType {
  selectedCartIds: string[];
  toggleSelectAll: (cartItems: CartItemTypes[], init?: boolean) => void;
  toggleCartItem: (id: string) => void;
  removeFromSelection: (id: string) => void;
}

const SelectedCartContext = createContext<SelectedCartContextType | null>(null);

export const SelectedCartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    toggleSelectAll,
    toggleCartItem,
    removeFromSelection,
    selectedCartIds,
  } = useSelectedCartIds();

  const contextValue = useMemo<SelectedCartContextType>(
    () => ({
      selectedCartIds,
      toggleSelectAll,
      toggleCartItem,
      removeFromSelection,
    }),
    [selectedCartIds, toggleSelectAll, toggleCartItem, removeFromSelection]
  );

  return (
    <SelectedCartContext.Provider value={contextValue}>
      {children}
    </SelectedCartContext.Provider>
  );
};

export function useSelectedCartContext() {
  const context = useContext(SelectedCartContext);
  if (!context) {
    throw new Error(
      "useSelectedCart는 SelectedCartProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
}
