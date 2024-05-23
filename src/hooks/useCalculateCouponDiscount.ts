import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';
import { Coupon } from '../types/Coupon.type';

export function useCalculateCouponDiscount() {
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);

  const calculateCouponDiscount = (currentTotalPrice: number, coupon: Coupon) => {
    switch (coupon.discountType) {
      case 'fixed': {
        return coupon.discount!;
      }
      case 'buyXgetY': {
        const x = coupon.buyQuantity!;
        const y = coupon.getQuantity!;
        const eligibleItems = selectedCartItemList.filter((item) => item.quantity >= x + y);
        const mostExpensiveItem = eligibleItems.reduce(
          (maxItem, item) => (item.product.price > maxItem.product.price ? item : maxItem),
          eligibleItems[0],
        );
        return mostExpensiveItem.product.price * y;
      }
      case 'freeShipping': {
        return deliveryFee;
      }
      case 'percentage': {
        return Math.round(currentTotalPrice * (coupon.discount! * 0.01));
      }
      default: {
        return 0;
      }
    }
  };
  return { calculateCouponDiscount };
}
