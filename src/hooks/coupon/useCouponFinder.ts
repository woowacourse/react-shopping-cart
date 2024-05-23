import { couponListAtom } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useCouponFinder = () => {
  const couponList = useRecoilValue(couponListAtom);

  /**
   * 특정 코드를 가진 쿠폰을 반환하는 함수
   */
  const getCoupon = (code: string) => {
    const coupon = couponList.get(code);

    if (!coupon) throw new Error('쿠폰을 찾을 수 없습니다.');

    return coupon;
  };

  /**
   * 서버로 부터 받은 모든 쿠폰을 객체 형태로 반환하는 함수
   */
  const getAllCoupons = () => ({
    fixed5000Coupon: getCoupon('FIXED5000'),
    bogoCoupon: getCoupon('BOGO'),
    freeShippingCoupon: getCoupon('FREESHIPPING'),
    miracleCoupon: getCoupon('MIRACLESALE'),
  });

  return { getCoupon, getAllCoupons };
};

export default useCouponFinder;
