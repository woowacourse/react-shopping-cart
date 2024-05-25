import { Coupon } from '@appTypes/orderConfirm';
import { PRICE } from '@constants/shippingCart';
import { useOrderCosts } from '@hooks/shoppingCart';
import { createDateTime, isExpiredDate } from '@utils/date';

const useConfirmCouponApplication = () => {
  const { beforeDiscountTotalPrice, shippingPrice } = useOrderCosts();

  const isApplicabilityCoupon = (coupon: Coupon, now: Date = new Date()) => {
    /* 만료일 확인 */
    if (!isExpiredDate(coupon.expirationDate)) return false;

    /* 최소 주문 조건 확인 */
    if (coupon?.minimumAmount && beforeDiscountTotalPrice < coupon.minimumAmount) {
      return false;
    }

    /* 무료 배송 가능 여부 확인 */
    if (coupon.discountType === 'freeShipping' && shippingPrice === PRICE.shippingFee.free) return false;

    /* 쿠폰 이용 시간 여부 확인  */
    if (coupon?.availableTime) {
      const startTime = createDateTime(coupon.availableTime.start);

      const endTime = createDateTime(coupon.availableTime.end);

      if (now < startTime || now > endTime) return false;
    }

    return true;
  };

  return isApplicabilityCoupon;
};

export default useConfirmCouponApplication;
