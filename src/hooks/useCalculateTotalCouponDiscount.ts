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
    const bogoCoupons = selectedCouponList.filter((coupon) => coupon.discountType === 'buyXgetY');
    const bogoDiscountedPrice = bogoCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, selectedCartItemTotalPrice);

    const percentageCoupons = selectedCouponList.filter((coupon) => coupon.discountType === 'percentage');
    percentageCoupons.sort((a, b) => b.discount! - a.discount!);
    const percentageDiscountedPrice = percentageCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, bogoDiscountedPrice);

    const fixedCoupons = selectedCouponList.filter(
      (coupon) => coupon.discountType !== 'percentage' && coupon.discountType !== 'buyXgetY',
    );
    const totalDiscountedPrice = fixedCoupons.reduce((acc, cur) => {
      return acc - calculateCouponDiscount(acc, cur);
    }, percentageDiscountedPrice);

    const totalCouponDiscount = selectedCartItemTotalPrice - totalDiscountedPrice;
    setSelectedCouponTotalDiscount(totalCouponDiscount);
  };

  return { selectedCouponTotalDiscount, calculateTotalCouponDiscount };
}
