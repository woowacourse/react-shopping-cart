import { useState, useMemo } from 'react';
import { Coupon } from '../types/coupon';
import { CartItemType } from '../types/response';
import {
  calculateOptimalCouponCombination,
  calculateSelectedCoupons,
} from '../utils/couponCalculator';
import { CartItem, mapToCartItems } from '../utils/cartMapper';

interface UseCouponCalculationProps {
  cartData: CartItemType[];
  coupons: Coupon[];
}

export const useCouponCalculation = ({
  cartData,
  coupons,
}: UseCouponCalculationProps) => {
  const [isRemoteArea, setIsRemoteArea] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  // 장바구니 데이터를 CartItem 형태로 변환
  const cartItems: CartItem[] = useMemo(() => {
    return mapToCartItems(cartData);
  }, [cartData]);

  // 자동 최적화 결과
  const autoOptimizationResult = useMemo(() => {
    return calculateOptimalCouponCombination(cartItems, coupons, isRemoteArea);
  }, [cartItems, coupons, isRemoteArea]);

  // 선택된 쿠폰들의 계산 결과
  const calculationResult = useMemo(() => {
    if (selectedCoupons.length > 0) {
      return calculateSelectedCoupons(cartItems, selectedCoupons, isRemoteArea);
    }
    return calculateSelectedCoupons(cartItems, [], isRemoteArea);
  }, [cartItems, selectedCoupons, isRemoteArea]);

  // 도서산간 지역 토글
  const handleRemoteAreaChange = () => {
    setIsRemoteArea(!isRemoteArea);
  };

  // 쿠폰 선택/해제 로직
  const handleCouponSelect = (coupon: Coupon | null) => {
    if (!coupon) return;

    setSelectedCoupons((prevSelected) => {
      const isAlreadySelected = prevSelected.some((c) => c.id === coupon.id);

      if (isAlreadySelected) {
        // 이미 선택된 쿠폰이면 제거
        return prevSelected.filter((c) => c.id !== coupon.id);
      } else {
        // 최대 2개까지만 선택 가능
        if (prevSelected.length >= 2) {
          // 가장 오래된 것을 제거하고 새로운 것 추가
          return [prevSelected[1], coupon];
        } else {
          return [...prevSelected, coupon];
        }
      }
    });
  };

  // 자동 최적화 적용
  const handleUseAutoOptimization = () => {
    setSelectedCoupons(autoOptimizationResult.appliedCoupons);
  };

  // 선택된 쿠폰 초기화
  const clearSelectedCoupons = () => {
    setSelectedCoupons([]);
  };

  // 특정 쿠폰 제거
  const removeCoupon = (couponId: number) => {
    setSelectedCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  return {
    // 상태
    isRemoteArea,
    selectedCoupons,
    cartItems,

    // 계산 결과
    autoOptimizationResult,
    calculationResult,

    // 핸들러 함수들
    handleRemoteAreaChange,
    handleCouponSelect,
    handleUseAutoOptimization,
    clearSelectedCoupons,
    removeCoupon,

    // 유틸리티
    hasAutoOptimization: autoOptimizationResult.appliedCoupons.length > 0,
    hasSelectedCoupons: selectedCoupons.length > 0,
    canSelectMoreCoupons: selectedCoupons.length < 2,
  };
};
