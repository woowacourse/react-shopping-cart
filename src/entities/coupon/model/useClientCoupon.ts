import { useState, useEffect } from 'react';
import { ClientCouponType } from '@entities/coupon/type/coupon.type';
import { validateCoupon } from '@entities/coupon/utils/validateCoupon';
import { useCoupon } from '@entities/coupon/model/useCoupon';
import {
  calculateCouponDiscount,
  recommendCouponComposition,
} from '@entities/coupon/utils/calculateCoupon';
import { COUPON_RULE } from '@entities/coupon/constants/couponRule';
import { CartItemType, calculateDeliveryFee, calculateOrderPrice } from '@entities/cart';

interface UseClientCouponProps {
  orderItems: CartItemType[];
  isRemoteArea: boolean;
  onError?: (message: string) => void;
}

export const useClientCoupon = ({ orderItems, isRemoteArea, onError }: UseClientCouponProps) => {
  const { coupons } = useCoupon();
  const [clientCoupons, setClientCoupons] = useState<ClientCouponType[]>([]);
  const orderPrice = calculateOrderPrice(orderItems);
  const deliveryFee = calculateDeliveryFee(orderPrice) + (isRemoteArea ? 3000 : 0);

  useEffect(() => {
    const newClientCoupons: ClientCouponType[] = coupons.map((coupon) => {
      const isValid = validateCoupon({ coupon, orderItems });
      const discountPrice = isValid
        ? calculateCouponDiscount({ coupon, orderItems, deliveryFee })
        : 0;

      return {
        coupon,
        disabled: !isValid,
        checked: false,
        discountPrice,
      };
    });

    const recommendedCouponIds = recommendCouponComposition(newClientCoupons);

    const finalClientCoupons = newClientCoupons.map((clientCoupon) => ({
      ...clientCoupon,
      checked: recommendedCouponIds.includes(clientCoupon.coupon.id),
    }));

    setClientCoupons(finalClientCoupons);
  }, [coupons]);

  useEffect(() => {
    if (clientCoupons.length === 0) return;

    setClientCoupons((prevCoupons) =>
      prevCoupons.map((clientCoupon) => {
        const discountPrice = calculateCouponDiscount({
          coupon: clientCoupon.coupon,
          orderItems,
          deliveryFee,
        });

        return {
          ...clientCoupon,
          discountPrice,
        };
      }),
    );
  }, [isRemoteArea]);

  const toggleCouponSelection = (couponId: number) => {
    setClientCoupons((prev) =>
      prev.map((clientCoupon) =>
        clientCoupon.coupon.id === couponId
          ? { ...clientCoupon, checked: !clientCoupon.checked }
          : clientCoupon,
      ),
    );
  };

  const checkMaxCouponCount = () => {
    const checkedCouponsCount = clientCoupons.filter((coupon) => coupon.checked).length;
    if (checkedCouponsCount >= COUPON_RULE.MAX_COUPON_COUNT) {
      onError?.(`쿠폰은 최대 ${COUPON_RULE.MAX_COUPON_COUNT}개까지만 사용 가능합니다.`);
      return true;
    }
    return false;
  };

  const toggleCouponWithinLimit = (couponId: number) => {
    const targetCoupon = clientCoupons.find((coupon) => coupon.coupon.id === couponId);
    if (!targetCoupon || targetCoupon.disabled) return;

    if (targetCoupon.checked) {
      toggleCouponSelection(couponId);
      return;
    }
    if (checkMaxCouponCount()) return;
    toggleCouponSelection(couponId);
  };

  return {
    clientCoupons,
    toggleCouponWithinLimit,
  };
};
