import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/atoms';
import { totalOrderPriceSelector, deliveryFeeSelector } from '../recoil/CartItem/selectors/selectors';
import { sortCouponsByDiscountRate } from '../utils/couponSorter';
import { calculateDiscountPrice } from '../utils/couponCalculator';
import { Coupon } from '../types/Coupon.type';

const useCartCalculator = () => {
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const calculateTotalDiscoutPrice = (coupons: Coupon[]) => {
    return sortCouponsByDiscountRate(coupons).reduce(
      (acc, cur) => (acc += calculateDiscountPrice(cur, selectedCartItemList, deliveryFee, totalOrderPrice)),
      0,
    );
  };

  return { calculateTotalDiscoutPrice };
};

export default useCartCalculator;
