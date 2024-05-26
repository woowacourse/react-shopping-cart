import { CouponCode } from '@appTypes/shoppingCart';
import { COUPON_CODE } from '@constants/coupon';
import { couponListAtom } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useCouponFinder = () => {
  const couponList = useRecoilValue(couponListAtom);

  const { fixed500, bogo, freeShipping, miracleSale } = COUPON_CODE;
  /**
   * 특정 코드를 가진 쿠폰을 반환하는 함수
   */
  const getCoupon = (code: CouponCode) => {
    const coupon = couponList.get(code);

    if (!coupon) throw new Error('쿠폰을 찾을 수 없습니다.');

    return coupon;
  };

  /**
   * 서버로 부터 받은 모든 쿠폰을 객체 형태로 반환하는 함수
   */
  const getAllCoupons = () => ({
    fixed5000Coupon: getCoupon(fixed500),
    bogoCoupon: getCoupon(bogo),
    freeShippingCoupon: getCoupon(freeShipping),
    miracleCoupon: getCoupon(miracleSale),
  });

  return { getCoupon, getAllCoupons };
};

export default useCouponFinder;
