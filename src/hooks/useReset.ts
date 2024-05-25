import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';

import { cartItemsState, checkedItemsState } from '@recoil/cartItems/atoms';
import { fixedSelectedCouponsState } from '@recoil/coupon/atom';

const useReset = (cartItemIds: number[]) => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const setFixedSelectedCoupons = useSetRecoilState(fixedSelectedCouponsState);

  const resetCheckedIds = useRecoilCallback(({ reset }) => () => {
    cartItemIds.forEach((cartItemId) => reset(checkedItemsState(cartItemId)));
  });

  const deleteOrderedCartItems = () => {
    setCartItems(cartItems.filter(({ id }) => !cartItemIds.includes(id)));
  };

  const resetFixedSelectedCoupons = () => {
    setFixedSelectedCoupons([]);
  };

  const reset = () => {
    resetFixedSelectedCoupons();
    resetCheckedIds();
    deleteOrderedCartItems();
  };

  return { reset };
};

export default useReset;
