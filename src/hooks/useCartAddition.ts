import { useEffect, useRef, useState } from 'react';
import { useRecoilCallback } from 'recoil';

import { TOAST_SHOW_DURATION } from '../constants';
import { cartListState } from '../store/cart';
import { CartItemData } from '../types';

const useCartAddition = () => {
  const [isAdded, setIsAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isAdded) {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setIsAdded(false);
      }, TOAST_SHOW_DURATION);
    }
  }, [isAdded]);

  const updateCartList = useRecoilCallback(
    ({ set }) =>
      (newCartList: CartItemData[]) => {
        set(cartListState, newCartList);
        setIsAdded(true);
      },
    []
  );

  return { isAdded, updateCartList };
};

export { useCartAddition };
