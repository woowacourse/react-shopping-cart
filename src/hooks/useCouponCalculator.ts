import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/atoms';
import { totalOrderPriceSelector, deliveryFeeSelector } from '../recoil/CartItem/selectors/selectors';
import { sortCouponsByDiscountRate } from '../utils/coupon/couponSorter/couponSorter';
import { calculateDiscountPrice } from '../utils/coupon/couponCalculator/couponCalculator';
import { Coupon } from '../types/Coupon.type';

const useCouponCalculator = () => {
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const calculateTotalDiscountPrice = (coupons: Coupon[]) => {
    return sortCouponsByDiscountRate(coupons).reduce(
      (acc, cur) => (acc += calculateDiscountPrice(cur, selectedCartItemList, totalOrderPrice, deliveryFee)),
      0,
    );
  };

  return { calculateTotalDiscountPrice };
};

export default useCouponCalculator;
