import { useRecoilState } from 'recoil';
import { couponsState } from '../recoil/atoms';
import { Items } from '../types/Item';

export const useCouponChecker = () => {
  const [coupons, setCoupons] = useRecoilState(couponsState);

  /**
   *  isChecked 상태를 토글
   */
  const toggleCouponCheck = (couponId: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === couponId
          ? { ...coupon, isChecked: !coupon.isChecked }
          : coupon,
      ),
    );
  };

  /**
   * isChecked 상태가 true인 쿠폰의 개수를 반환하는 함수
   */
  const getCheckedCount = () => {
    return coupons.filter((coupon) => coupon.isChecked).length;
  };

  /**
   * 주문할 상품 중 개수가 buyQuantity 이상인 상품이 있는 경우 true
   * @return {boolean}
   */
  const isOrderItemCountUpperBuyQuantity = (orderItems: Items[]) => {
    const buyQuantity = coupons.find(
      (coupon) => coupon.buyQuantity,
    )?.buyQuantity;

    return buyQuantity
      ? orderItems.some((item) => item.quantity >= buyQuantity)
      : true;
  };

  return {
    coupons,
    toggleCouponCheck,
    getCheckedCount,
    isOrderItemCountUpperBuyQuantity,
  };
};
