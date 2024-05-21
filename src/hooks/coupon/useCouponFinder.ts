import { CouponCode } from '@appTypes/shoppingCart';
import { couponListAtom } from '@recoil/shoppingCart';
import { useRecoilValue } from 'recoil';

const useCouponFinder = () => {
  const couponList = useRecoilValue(couponListAtom);

  const getCoupon = (code: CouponCode) => {
    const coupon = couponList.get(code);
    if (!coupon) throw new Error('쿠폰을 찾을 수 없습니다.');
    return coupon;
  };

  const getAllCoupons = () => ({
    fixed5000Coupon: getCoupon('FIXED5000'),
    bogoCoupon: getCoupon('BOGO'),
    freeShippingCoupon: getCoupon('FREESHIPPING'),
    miracleCoupon: getCoupon('MIRACLESALE'),
  });

  return { getCoupon, getAllCoupons };
};

export default useCouponFinder;
