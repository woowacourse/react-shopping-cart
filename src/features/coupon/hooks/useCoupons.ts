import { useEffect, useState } from 'react';
import { Coupon } from '../types/coupon';
import { getCoupons } from '../api/getCoupons';
import { CartItem } from '../../cart/api/types/cart';
import { getCouponDiscountPrice } from '../utils/getCouponDiscountPrice';
import { validateExpirationDate } from '../utils/validateExpirationDate';
import { validateAvailableTime } from '../utils/validateAvailableTime';
import { validateMinimumAmount } from '../utils/validateMinimumAmount';

const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isCouponLoading, setIsCouponLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setIsCouponLoading(true);
        const response = await getCoupons();
        setCoupons(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error('쿠폰 목록을 가져오는 중 오류 발생:', error.message);
        }
      } finally {
        setIsCouponLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const getInvalidCouponIds = (totalPrice: number): number[] => {
    const currentDate = new Date();

    return coupons
      .filter(
        (coupon) =>
          !validateExpirationDate(currentDate, coupon.expirationDate) ||
          (coupon.availableTime && !validateAvailableTime(currentDate, coupon.availableTime)) ||
          (coupon.minimumAmount && !validateMinimumAmount(totalPrice, coupon))
      )
      .map((coupon) => coupon.id);
  };

  const getBestTwoCoupons = (cartItem: CartItem, totalPrice: number, deliveryFee: number): Coupon[] => {
    const invalidCouponIds = getInvalidCouponIds(totalPrice);
    const validCoupons = coupons.filter((coupon) => !invalidCouponIds.includes(coupon.id));

    const couponsWithDiscountPrice = validCoupons.map((coupon) => {
      const discountPrice = getCouponDiscountPrice({ coupon, cartItem, totalPrice, deliveryFee });
      return { discountPrice, coupon };
    });

    couponsWithDiscountPrice.sort((a, b) => b.discountPrice - a.discountPrice);
    return couponsWithDiscountPrice.slice(0, 2).map((item) => item.coupon);
  };

  return { coupons, getBestTwoCoupons, getInvalidCouponIds, isCouponLoading };
};

export default useCoupons;
