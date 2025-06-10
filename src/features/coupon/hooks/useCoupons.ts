import { CartItem } from '../../cart/api/types/cart';
import { getCouponDiscountPrice } from '../utils/getCouponDiscountPrice';
import { validateCoupon } from '../utils/validateCoupon';
import { useFetchCoupons } from './useFetchCoupons';

const useCoupons = () => {
  const { coupons, isLoading, error } = useFetchCoupons();

  const getInvalidCouponIds = (totalPrice: number): number[] => {
    const currentDate = new Date();

    return coupons.filter((coupon) => !validateCoupon(coupon, totalPrice, currentDate)).map((coupon) => coupon.id);
  };

  const getBestTwoCoupons = (cartItem: CartItem, totalPrice: number, deliveryFee: number) => {
    const invalidCouponIds = getInvalidCouponIds(totalPrice);
    const validCoupons = coupons.filter((coupon) => !invalidCouponIds.includes(coupon.id));
    const couponsWithDiscountInfo = validCoupons.map((coupon) => {
      const discountInfo = getCouponDiscountPrice({
        coupon,
        cartItem,
        totalPrice,
        deliveryFee,
      });
      return {
        coupon,
        discountPrice: discountInfo.price,
        type: discountInfo.type,
        message: discountInfo.message,
      };
    });

    const buyXgetYMessages = couponsWithDiscountInfo.find((coupon) => coupon.type === 'buyXgetY')?.message;

    couponsWithDiscountInfo.sort((a, b) => b.discountPrice - a.discountPrice);
    const filteredCouponsWithDiscountInfo = couponsWithDiscountInfo.filter((coupon) => coupon.discountPrice > 0);
    return { coupons: filteredCouponsWithDiscountInfo.slice(0, 2), message: buyXgetYMessages || '' };
  };

  return { coupons, getBestTwoCoupons, getInvalidCouponIds, isCouponLoading: isLoading, couponError: error };
};

export default useCoupons;
