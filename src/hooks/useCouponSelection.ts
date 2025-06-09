import { useState } from 'react';
import { Coupon } from '../types/coupon';
import { isCouponAvailable } from '../utils/couponAvailability';
import { MAX_COUPONS } from '../constants/couponConfig';

interface UseCouponSelectionReturn {
  selectedCoupons: Coupon[];
  tempSelectedCoupons: Coupon[];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleCouponSelection: (coupon: Coupon) => void;
  isCouponSelected: (couponId: number) => boolean;
  applyCoupons: () => void;
}

export const useCouponSelection = (): UseCouponSelectionReturn => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [tempSelectedCoupons, setTempSelectedCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCouponSelection = (coupon: Coupon) => {
    if (!isCouponAvailable(coupon)) {
      return;
    }

    setTempSelectedCoupons((prev) => {
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
    return tempSelectedCoupons.some((coupon) => coupon.id === couponId);
  };

  const openModal = () => {
    setTempSelectedCoupons(selectedCoupons);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTempSelectedCoupons([]);
    setIsModalOpen(false);
  };

  const applyCoupons = () => {
    setSelectedCoupons(tempSelectedCoupons);
    setIsModalOpen(false);
  };

  return {
    selectedCoupons,
    tempSelectedCoupons,
    isModalOpen,
    openModal,
    closeModal,
    toggleCouponSelection,
    isCouponSelected,
    applyCoupons,
  };
};
