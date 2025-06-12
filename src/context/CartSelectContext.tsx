import { createContext, useContext } from 'react';
import { useCartSelection } from '../hooks/useCartSelection';
import { useCartData } from '../utils/fetcher';

interface CartSelectionContextType {
  checkedItems: number[];
  isAllChecked: boolean;
  handleAllCheck: () => void;
  toggleItem: (id: number) => void;
}

const CartSelectionContext = createContext<CartSelectionContextType | null>(null);

export function CartSelectionProvider({ children }: { children: React.ReactNode }) {
  const { data: cartItems } = useCartData();

  const { checkedItems, isAllChecked, handleAllCheck, toggleItem } = useCartSelection(cartItems);

  return (
    <CartSelectionContext.Provider
      value={{
        checkedItems,
        isAllChecked,
        handleAllCheck,
        toggleItem,
      }}
    >
      {children}
    </CartSelectionContext.Provider>
  );
}

export function useCartSelectContext() {
  const context = useContext(CartSelectionContext);
  if (!context) {
    throw new Error('useCartSelectContext에 context가 없습니다.');
  }
  return context;
}
