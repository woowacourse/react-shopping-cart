import { useEffect, useState, useContext, useMemo } from 'react';
import { useFetchData } from '../../../shared/hooks/useFetchData';
import { getCouponList } from '../../../features/Coupon/api/coupon';
import { Coupon, CouponResponse } from '../../../features/Coupon/types/Coupon.types';
import { isCouponValid } from '../../../features/Coupon/utils/validateCoupon';
import { getBestCouponCombination } from '../../../features/Coupon/utils/combinations';
import { calculateTotalDiscount } from '../../../features/Coupon/utils/calculateTotalDiscount';
import { ToastContext } from '../../../shared/context/ToastProvider';
import { isError } from '../../../shared/utils/isError';
import { useCartContext } from '../../../features/Cart/context/CartProvider';
import { useOrderInfo } from '../../../features/Cart/hooks/useOrderInfo';
import { usePriceInfo } from '../../../features/Cart/hooks/usePriceInfo';
import { useSelectedCart } from '@/features/Cart/hooks/useSelectedCart';

export const useCouponSelection = () => {
  const { cartItems, isRemoteArea } = useCartContext();
  const selectedCartItems = useSelectedCart();
  const { totalPrice } = useOrderInfo();
  const { deliveryFee } = usePriceInfo();
  const { showToast } = useContext(ToastContext);

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showCouponList, setShowCouponList] = useState(false);
  const coupon = useFetchData<CouponResponse[]>({ autoFetch: getCouponList });
  const selectedCoupons = coupons.filter((c) => c.checked && !c.disabled);
  const discountAmount = calculateTotalDiscount(selectedCartItems, selectedCoupons, {
    totalPrice,
    isRemoteArea,
  });

  useEffect(() => {
    if (coupon.data) {
      const validated = coupon.data.map((c) => ({
        ...c,
        checked: false,
        disabled: !isCouponValid(c, selectedCartItems, totalPrice),
      }));
      setCoupons(validated);
    }
  }, [coupon.data]);

  useEffect(() => {
    if (coupon.error && isError(coupon.error)) {
      showToast('쿠폰 정보를 불러올 수 없습니다.');
    }
  }, [coupon.error, showToast]);

  useEffect(() => {
    if (showCouponList) {
      const validCoupons = coupons.filter((c) => !c.disabled);
      const best = getBestCouponCombination(validCoupons, cartItems, {
        isRemoteArea,
        totalPrice,
        deliveryFee,
      });

      setCoupons((prev) =>
        prev.map((c) => ({
          ...c,
          checked: best.some((b) => b.id === c.id),
        }))
      );
    }
  }, [showCouponList]);

  const ToggleCoupon = (id: number) => {
    setCoupons((prevCoupons) => {
      const selectCouponCount = prevCoupons.filter((c) => c.checked).length;
      const target = prevCoupons.find((c) => c.id === id);
      if (!target) return prevCoupons;
      if (!target.checked && selectCouponCount >= 2) return prevCoupons;

      return prevCoupons.map((coupon) =>
        coupon.id === id ? { ...coupon, checked: !coupon.checked } : coupon
      );
    });
  };

  const ApplyCoupons = () => {
    setShowCouponList(false);
  };

  return {
    coupons,
    discountAmount,
    selectedCoupons,
    showCouponList,
    setShowCouponList,
    ToggleCoupon,
    ApplyCoupons,
  };
};
