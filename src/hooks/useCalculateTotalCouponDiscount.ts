import { useCalculateCouponDiscount } from './useCalculateCouponDiscount';
import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedCouponTotalDiscountState } from '../recoil/Coupon/atoms/selectedCouponTotalDiscountState';

export function useCalculateTotalCouponDiscount() {
  const { calculateCouponDiscount } = useCalculateCouponDiscount();
  const [selectedCouponTotalDiscount, setSelectedCouponTotalDiscount] = useRecoilState(
    selectedCouponTotalDiscountState,
  );
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const calculateTotalCouponDiscount = () => {
    const percentageCoupons = selectedCouponList.filter((coupon) => coupon.discountType === 'percentage');
    percentageCoupons.sort((a, b) => b.discount! - a.discount!);

    const percentageDiscount = percentageCoupons.reduce((acc, cur) => {
      return acc + calculateCouponDiscount(cur);
    }, 0);

    const remainingCoupons = selectedCouponList.filter((coupon) => coupon.discountType !== 'percentage');
    const remainingDiscount = remainingCoupons.reduce((acc, cur) => {
      return acc + calculateCouponDiscount(cur);
    }, 0);

    setSelectedCouponTotalDiscount(percentageDiscount + remainingDiscount);
  };

  return { selectedCouponTotalDiscount, calculateTotalCouponDiscount };
}
