import { useState, useEffect } from 'react';
import { ClientCouponType } from '@entities/coupon/type/coupon.type';
import { validateCoupon } from '@features/coupon/utils/validateCoupon';
import { useCoupon } from '@features/coupon/model/useCoupon';
import { CartItemType } from '@entities/cart';
import {
  calculateCouponDiscount,
  recommendCouponComposition,
} from '@features/coupon/utils/calculateCoupon';
import { COUPON_RULE } from '@features/coupon/constants/couponRule';
import {
  calculateDeliveryFee,
  calculateOrderPrice,
} from '@features/cart/utils/cartPriceCalculator';

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
  }, [coupons, isRemoteArea]);

  const handleCouponCheck = (couponId: number) => {
    const targetCoupon = clientCoupons.find((coupon) => coupon.coupon.id === couponId);
    if (!targetCoupon || targetCoupon.disabled) return;

    if (targetCoupon.checked) {
      setClientCoupons((prev) =>
        prev.map((clientCoupon) =>
          clientCoupon.coupon.id === couponId ? { ...clientCoupon, checked: false } : clientCoupon,
        ),
      );
      return;
    }

    const checkedCouponsCount = clientCoupons.filter((coupon) => coupon.checked).length;
    if (checkedCouponsCount >= COUPON_RULE.MAX_COUPON_COUNT) {
      onError?.(`쿠폰은 최대 ${COUPON_RULE.MAX_COUPON_COUNT}개까지만 사용 가능합니다.`);
      return;
    }

    setClientCoupons((prev) =>
      prev.map((clientCoupon) =>
        clientCoupon.coupon.id === couponId ? { ...clientCoupon, checked: true } : clientCoupon,
      ),
    );
  };

  return {
    clientCoupons,
    handleCouponCheck,
  };
};
