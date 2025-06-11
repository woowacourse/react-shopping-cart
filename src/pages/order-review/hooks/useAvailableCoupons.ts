import { CouponContent } from '@/api/type';
import { useOrderListContext } from '@/pages/shopping-cart/context/OrderListProvider';
import { couponValidator } from '../utils/couponValidator';

export const useAvailableCoupons = (
  coupons: CouponContent[],
  isJejuOrRemoteArea: boolean
) => {
  const { selectedItems, orderPrice } = useOrderListContext();

  const availableCoupons = couponValidator(
    coupons,
    isJejuOrRemoteArea,
    selectedItems,
    orderPrice
  );

  return { availableCoupons };
};
