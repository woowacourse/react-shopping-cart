import { ReactNode, useEffect, useRef, useState } from 'react';
import { useCartItemsContext } from '../CartItems/CartItemsContext';
import { CheckCartIdsContext } from './CheckedCartIdsContext';
import getIdsFromCartItems from '../../utils/getIdsFromCartItems';

const CheckCartIdsProvider = ({ children }: { children: ReactNode }) => {
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
    <CheckCartIdsContext.Provider
      value={{ checkedCartIds, setCheckedCartIds, isAllChecked }}
    >
      {children}
    </CheckCartIdsContext.Provider>
  );
};

export default CheckCartIdsProvider;
