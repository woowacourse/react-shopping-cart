import { useRecoilState, useRecoilValue } from 'recoil';

import { selectedCartItemListTotalPriceSelector } from '../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { selectedCouponTotalDiscountState } from '../recoil/Coupon/atoms/selectedCouponTotalDiscountState';
import { useCalculateCouponDiscount } from './useCalculateCouponDiscount';

export function useCalculateTotalCouponDiscount() {
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const { calculateCouponDiscount } = useCalculateCouponDiscount();
  const [selectedCouponTotalDiscount, setSelectedCouponTotalDiscount] = useRecoilState(
    selectedCouponTotalDiscountState,
  );
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const calculateTotalCouponDiscount = () => {
    const percentageCoupons = selectedCouponList.filter((coupon) => coupon.discountType === 'percentage');
    percentageCoupons.sort((a, b) => b.discount! - a.discount!);
    const percentageDiscountedPrice = percentageCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, selectedCartItemTotalPrice);

    const remainingCoupons = selectedCouponList.filter((coupon) => coupon.discountType !== 'percentage');
    const remainingDiscountedPrice = remainingCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, percentageDiscountedPrice);
    const totalCouponDiscount = selectedCartItemTotalPrice - remainingDiscountedPrice;
    setSelectedCouponTotalDiscount(totalCouponDiscount);
  };

  return { selectedCouponTotalDiscount, calculateTotalCouponDiscount };
}
