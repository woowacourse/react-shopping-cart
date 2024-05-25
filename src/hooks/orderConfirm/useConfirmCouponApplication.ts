import { Coupon } from '@appTypes/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { isExpiredDate } from '@utils/date';
import { COUPON_VALIDATION_MAP } from '@validation/coupon/coupon';
import { useRecoilValue } from 'recoil';

const useConfirmCouponApplication = () => {
  const { beforeDiscountTotalPrice: totalPrice, shippingPrice } = useOrderCosts();

  const selectedCartItems = useRecoilValue(selectedItemsSelector);

  const isApplicabilityCoupon = (coupon: Coupon) => {
    if (isExpiredDate(coupon.expirationDate)) return false;

    const isValidCoupon = COUPON_VALIDATION_MAP[coupon.discountType];

    return isValidCoupon({ coupon, totalPrice, shippingPrice, selectedCartItems });
  };

  return isApplicabilityCoupon;
};

export default useConfirmCouponApplication;
