import { CouponContent } from '@/api/type';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import { couponValidator } from '../utils/couponValidator';
import { useMemo } from 'react';

export const useAvailableCoupons = (
  coupons: CouponContent[],
  isJejuOrRemoteArea: boolean
) => {
  const { selectedItems, orderPrice } = useOrderListContext();

  const availableCoupons = useMemo(() => {
    return couponValidator(
      coupons,
      isJejuOrRemoteArea,
      selectedItems,
      orderPrice
    );
  }, [coupons, isJejuOrRemoteArea, selectedItems, orderPrice]);

  return { availableCoupons };
};
