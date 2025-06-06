import { useState } from 'react';

import { getCoupons } from '@/api/order';
import { CartItemList } from '@/features/Cart/types/Cart.types';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { CouponResponse } from '../type/coupon.type';

// TODO
// 1. 초기 최적 함수 계산 -> 페이지 첫 진입이라는 것을 어떻게 알 것 인지? -> isInitialLoading을 통해서
// 2. 계산 함수
// 3. 쿠폰 적용 시 할인 금액
// 4. 어떻게 처음에 최적의 쿠폰을 선택할 것인가?
export const useCoupons = ({ cartItems }: CartItemList) => {
  const coupons = useFetchData<CouponResponse[]>({ autoFetch: getCoupons });
  const [checkedCoupons, setCheckedCoupons] = useState<Set<number>>(new Set());
  const [specialDeliveryZone, setSpecialDeliveryZone] = useState(false);

  const totalPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);
  const couponDiscount = 0;
  const deliveryFee = 0;

  const applyCoupon = (id: number) => {
    if (!checkedCoupons.has(id) && checkedCoupons.size === 2) return;

    setCheckedCoupons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedSpecialDeliveryZone = () => setSpecialDeliveryZone(!specialDeliveryZone);

  const couponItems = coupons.data?.map((item) => {
    return {
      ...item,
      isChecked: checkedCoupons.has(item.id),
    };
  });

  return {
    coupons: couponItems,
    totalPrice,
    applyCoupon,
    couponDiscount,
    deliveryFee: totalPrice > 100000 ? 0 : specialDeliveryZone ? 6000 : 3000,
    specialDeliveryZone,
    selectedSpecialDeliveryZone,
  };
};
