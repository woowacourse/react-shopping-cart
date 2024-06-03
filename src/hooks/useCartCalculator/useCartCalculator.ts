import { useRecoilValue } from 'recoil';
import { useDiscountCalculator } from '../useDiscountCalculator/useDiscountCalculator';
import { couponList } from '../../recoil/atoms/atoms';
import { calculateOrderPrice } from '../../recoil/selectors/selectors';

export const useCartCalculator = () => {
  const { totalOrderPrice } = useRecoilValue(calculateOrderPrice);
  const coupons = useRecoilValue(couponList);
  const { calculateDiscountAmount } = useDiscountCalculator();

  const getTotalPriceAfterDiscount = (couponCode: string) => {
    const coupon = coupons.find((coupon) => coupon.code === couponCode);
    if (!coupon) {
      return totalOrderPrice;
    }

    const discountAmount = calculateDiscountAmount(coupon, totalOrderPrice);
    return totalOrderPrice - discountAmount;
  };

  return {
    getTotalPriceAfterDiscount,
  };
};
