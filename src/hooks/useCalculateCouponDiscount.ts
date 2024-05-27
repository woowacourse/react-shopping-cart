import { useRecoilState, useRecoilValue } from 'recoil';

import { DISCOUNT_TYPES } from '../constants/DISCOUNT_TYPES';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { selectedCouponTotalDiscountState } from '../recoil/Coupon/atoms/selectedCouponTotalDiscountState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';

import type { Coupon } from '../types/Coupon';
export function useCalculateCouponDiscount() {
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);

  const calculateCouponDiscount = (currentTotalPrice: number, coupon: Coupon) => {
    switch (coupon.discountType) {
      case DISCOUNT_TYPES.fixed: {
        return coupon.discount!;
      }
      case DISCOUNT_TYPES.buyXgetY: {
        const x = coupon.buyQuantity!;
        const y = coupon.getQuantity!;
        const eligibleItems = selectedCartItemList.filter((item) => item.quantity >= x + y);
        const mostExpensiveItem = eligibleItems.reduce(
          (maxItem, item) => (item.product.price > maxItem.product.price ? item : maxItem),
          eligibleItems[0],
        );
        return mostExpensiveItem.product.price * y;
      }
      case DISCOUNT_TYPES.freeShipping: {
        return deliveryFee;
      }
      case DISCOUNT_TYPES.percentage: {
        return Math.round(currentTotalPrice * (coupon.discount! * 0.01));
      }
      default: {
        return 0;
      }
    }
  };

  return { calculateCouponDiscount };
}

export function useCalculateTotalCouponDiscount() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const { calculateCouponDiscount } = useCalculateCouponDiscount();
  const [selectedCouponTotalDiscount, setSelectedCouponTotalDiscount] = useRecoilState(
    selectedCouponTotalDiscountState,
  );
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const calculateTotalCouponDiscount = () => {
    const bogoCoupons = selectedCouponList.filter((coupon) => coupon.discountType === DISCOUNT_TYPES.buyXgetY);
    const bogoDiscountedPrice = bogoCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, selectedCartItemTotalPrice);

    const percentageCoupons = selectedCouponList.filter((coupon) => coupon.discountType === DISCOUNT_TYPES.percentage);
    percentageCoupons.sort((a, b) => b.discount! - a.discount!);
    const percentageDiscountedPrice = percentageCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, bogoDiscountedPrice);

    const fixedCoupons = selectedCouponList.filter(
      (coupon) => coupon.discountType !== DISCOUNT_TYPES.percentage && coupon.discountType !== DISCOUNT_TYPES.buyXgetY,
    );
    const totalDiscountedPrice = fixedCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, percentageDiscountedPrice);

    const totalCouponDiscount = selectedCartItemTotalPrice - totalDiscountedPrice;
    setSelectedCouponTotalDiscount(totalCouponDiscount);
  };

  return { selectedCouponTotalDiscount, calculateTotalCouponDiscount };
}
