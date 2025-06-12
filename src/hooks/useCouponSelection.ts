import { useState } from 'react';
import { Coupon } from '../types/coupon';
import { isCouponAvailable } from '../utils/couponAvailability';
import { MAX_COUPONS } from '../constants/couponConfig';

export const useCouponSelection = () => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[] | null>(null);

  const modalEnabled = tempSelectedCoupons !== null;

  const toggleCouponSelection = (coupon: Coupon) => {
    if (!isCouponAvailable(coupon)) {
      return;
    }

    setTempSelectedCoupons((prev) => {
      if (!prev) {
        return prev;
      }

      const isSelected = prev.some((couponItem) => couponItem.id === coupon.id);

      if (isSelected) {
        return prev.filter((couponItem) => couponItem.id !== coupon.id);
      }

      if (prev.length >= MAX_COUPONS) {
        alert(`쿠폰은 최대 ${MAX_COUPONS}개까지 선택 가능합니다.`);
        return prev;
      }

      return [...prev, coupon];
    });
  };

  const isCouponSelected = (couponId: number) => {
    return tempSelectedCoupons?.some((coupon) => coupon.id === couponId) || false;
  };

  const openModal = () => {
    setTempSelectedCoupons(selectedCoupons);
  };

  const closeModal = () => {
    setTempSelectedCoupons(null);
  };

  const applyCoupons = () => {
    if (tempSelectedCoupons) {
      setSelectedCoupons(tempSelectedCoupons);
    }
    setTempSelectedCoupons(null);
  };

  return {
    selectedCoupons,
    tempSelectedCoupons,
    modalEnabled,
    openModal,
    closeModal,
    toggleCouponSelection,
    isCouponSelected,
    applyCoupons,
  };
};
