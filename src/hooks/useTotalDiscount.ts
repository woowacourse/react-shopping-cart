import { useRecoilValue } from 'recoil';
import {
  discountedPriceState,
  isShippingFeeDiscountState,
} from '../recoil/coupons';
import { shippingFeeSelector } from '../recoil/cartItems';

const useTotalDiscount = () => {
  const discountPrice = useRecoilValue(discountedPriceState);
  const isDiscountShippingFee = useRecoilValue(isShippingFeeDiscountState);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  return isDiscountShippingFee ? discountPrice + shippingFee : discountPrice;
};

export default useTotalDiscount;
