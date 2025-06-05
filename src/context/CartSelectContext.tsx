import { createContext, useContext } from 'react';
import { useCartSelection } from '../hooks/useCartSelection';
import { useData } from './DataContext';
import { getCartItems } from '../apis/cart';

interface CartSelectionContextType {
  checkedItems: number[];
  isAllChecked: boolean;
  handleAllCheck: (checked: boolean) => void;
  toggleItem: (id: number) => void;
}

const CartSelectionContext = createContext<CartSelectionContextType | null>(null);

export function CartSelectionProvider({ children }: { children: React.ReactNode }) {
  const { data: cartItems } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });
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
