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

  return { coupons, getBestTwoCoupons, getInvalidCouponIds, isCouponLoading };
};

export default useCoupons;
