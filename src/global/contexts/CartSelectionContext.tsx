import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { calculateOrderPrice } from '../../components/features/cart/utils/cartCalculations';
import { CartItemType } from '../../components/features/cart/types';
import { useCartContext } from './CartContext';

interface CartSelectionContextValue {
  selectedList: boolean[];
  allSelected: boolean;
  selectCartItems: CartItemType[];
  orderPrice: number;
  disabled: boolean;
  setSelectedList: (list: boolean[]) => void;
  toggle: (index: number) => void;
  toggleAll: () => void;
}

const CartSelectionContext = createContext<CartSelectionContextValue | null>(
  null
);

export function CartSelectionProvider({ children }: { children: ReactNode }) {
  const { cartItems } = useCartContext();
  const [selectedList, setSelectedList] = useState<boolean[]>([]);

  useEffect(() => {
    setSelectedList(Array.from({ length: cartItems.length }, () => true));
  }, [cartItems.length]);

  const allSelected = useMemo(
    () => selectedList.length > 0 && selectedList.every(Boolean),
    [selectedList]
  );
  const toggle = useCallback((index: number) => {
    setSelectedList((list) => list.map((v, i) => (i === index ? !v : v)));
  }, []);
  const toggleAll = useCallback(() => {
    setSelectedList((list) =>
      Array.from({ length: list.length }, () => !allSelected)
    );
  }, [allSelected]);
  const selectCartItems = useMemo(
    () => cartItems.filter((_, idx) => selectedList[idx]),
    [cartItems, selectedList]
  );
  const orderPrice = useMemo(
    () => calculateOrderPrice(selectCartItems),
    [selectCartItems]
  );
  const disabled = !selectedList.some(Boolean);

  const value = useMemo(
    () => ({
      selectedList,
      allSelected,
      selectCartItems,
      orderPrice,
      disabled,
      setSelectedList,
      toggle,
      toggleAll,
    }),
    [
      selectedList,
      allSelected,
      selectCartItems,
      orderPrice,
      disabled,
      setSelectedList,
      toggle,
      toggleAll,
    ]
  );

  return (
    <CartSelectionContext.Provider value={value}>
      {children}
    </CartSelectionContext.Provider>
  );
}

export function useCartSelectionContext() {
  const ctx = useContext(CartSelectionContext);
  if (!ctx) throw new Error('CartSelectionContext not found!');
  return ctx;
}
