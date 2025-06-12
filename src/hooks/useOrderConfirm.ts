import { useState } from 'react';
import { useLocation } from 'react-router';
import { useShippingFee } from './useShippingFee';
import { calculateCouponDiscount } from '../utils/couponCalculations';
import { Coupon } from '../types/coupon';

export const useOrderConfirm = () => {
  const location = useLocation();
  const { products, price } = location.state || {};

  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const { remoteArea, toggleRemoteArea, baseShippingFee, remoteAreaFee, totalShippingFee } =
    useShippingFee({
      subtotal: price,
      selectedCoupons,
    });

  const couponDiscount = calculateCouponDiscount({
    coupons: selectedCoupons,
    products: products || [],
    total: price || 0,
    shippingFee: baseShippingFee + remoteAreaFee,
  });

  const finalTotal = (price || 0) - couponDiscount + totalShippingFee;

  return {
    // 쿠폰 관련
    selectedCoupons,
    setSelectedCoupons,

    // 배송 관련
    remoteArea,
    toggleRemoteArea,
    totalShippingFee,
    baseShippingFee,
    remoteAreaFee,

    // 가격 계산
    couponDiscount,
    finalTotal,

    // 데이터
    products,
    price,
  };
};
