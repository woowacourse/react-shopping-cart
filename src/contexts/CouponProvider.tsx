import { ReactNode, useEffect, useState } from 'react';
import useCoupons from '../hooks/useCoupons';
import useCheckedCouponIds from '../hooks/useCheckedCouponIds';
import { CouponContext } from './CouponContext';
import { useCartItemsContext } from './CartItemsContext';
import { getCheckedItems, getOrderPrice } from '../utils';
import { DELIVERY_PRICE, DELIVERY_PRICE_THRESHOLD, MAX_COUPON_AMOUNT } from '../constants/config';

const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const couponsState = useCoupons();
  const checkedCouponIdsState = useCheckedCouponIds();
  const { cartItems, checkedCartIds } = useCartItemsContext();

  const { coupons, getAvailableCoupons } = couponsState;
  const { initCheckedCouponIds } = checkedCouponIdsState;

  const checkedCartItems = getCheckedItems(cartItems, checkedCartIds);
  const availableCoupons = getAvailableCoupons(checkedCartItems);
  const orderPrice = getOrderPrice(checkedCartItems);

  useEffect(() => {
    if (!isFirstLoading) return;
    if (coupons.length !== 0) {
      setIsFirstLoading(false);
      initCheckedCouponIds(
        availableCoupons,
        checkedCartItems,
        orderPrice >= DELIVERY_PRICE_THRESHOLD || orderPrice === 0 ? 0 : DELIVERY_PRICE,
        MAX_COUPON_AMOUNT
      );
    }
  }, [
    availableCoupons,
    checkedCartItems,
    coupons.length,
    initCheckedCouponIds,
    isFirstLoading,
    orderPrice,
  ]);

  return (
    <CouponContext.Provider
      value={{
        ...couponsState,
        ...checkedCouponIdsState,
      }}>
      {children}
    </CouponContext.Provider>
  );
};

export default CouponProvider;
