import { ReactNode, useEffect, useRef, useState } from 'react';
import { useCartItemsContext } from './CartItemsContext';
import { CheckedCartItemsContext } from './CheckedCartItemContext';
import getIdsFromCartItems from '../utils/getIdsFromCartItems';

const CheckedCartItemsProvider = ({ children }: { children: ReactNode }) => {
  const isFirstLoad = useRef(true);
  const { cartItems } = useCartItemsContext();

  const [checkedCartIds, setCheckedCartIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isFirstLoad.current) return;
    if (cartItems.length > 0) {
      isFirstLoad.current = false;
      setCheckedCartIds(getIdsFromCartItems(cartItems));
    }
  }, [cartItems]);

  const isAllChecked =
    cartItems.length > 0 && checkedCartIds.length === cartItems.length;

  return (
    <CheckedCartItemsContext.Provider
      value={{ checkedCartIds, setCheckedCartIds, isAllChecked }}
    >
      {children}
    </CheckedCartItemsContext.Provider>
  );
};

export default CheckedCartItemsProvider;
