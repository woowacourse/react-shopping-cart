import { useEffect, useMemo, useState } from 'react';
import { type ModalProps } from '@sebin0580/modal';

import { CartItem } from '@/features/Cart/types/Cart.types';

import { CouponItem, Coupons } from '../type/coupon.type';
import { calculateBOGODiscount, getDiscountAmount } from '../utils/calculateCoupons';

type SelectCouponProps = {
  isAutoMode: boolean;
  coupons: CouponItem[];
  totalPrice: number;
  cartItems: CartItem[];
  onApplyCoupon: (id: number, currentlyChecked?: boolean) => void;
  specialDeliveryZone: boolean;
} & Coupons &
  Pick<ModalProps, 'isOpen' | 'onClose'>;

export const useModalSelectCoupon = ({
  isAutoMode,
  coupons,
  onApplyCoupon,
  totalPrice,
  isOpen,
  onClose,
  cartItems,
  specialDeliveryZone,
}: SelectCouponProps) => {
  const [selectCoupons, setSelectCoupons] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen) {
      const currentChecked = new Set<number>(
        coupons.filter((coupon) => coupon.isChecked).map((coupon) => coupon.id)
      );
      setSelectCoupons(currentChecked);
    }
  }, [isOpen, coupons]);

  const handleTempToggle = (id: number) => {
    setSelectCoupons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const handleConfirm = () => {
    const currentChecked = new Set(
      coupons.filter((coupon) => coupon.isChecked).map((coupon) => coupon.id)
    );

    if (isAutoMode) {
      currentChecked.forEach((id) => {
        onApplyCoupon(id, true);
      });

      selectCoupons.forEach((id) => {
        onApplyCoupon(id, false);
      });
    } else {
      currentChecked.forEach((id) => {
        if (!selectCoupons.has(id)) {
          onApplyCoupon(id, true);
        }
      });

      selectCoupons.forEach((id) => {
        if (!currentChecked.has(id)) {
          onApplyCoupon(id, false);
        }
      });
    }
    onClose();
  };

  const modalItems = coupons.map((coupon) => ({
    ...coupon,
    isChecked: selectCoupons.has(coupon.id),
    isDisabled: coupon.isDisabled || (selectCoupons.size >= 2 && !selectCoupons.has(coupon.id)),
  }));

  const couponDiscount = useMemo(() => {
    const selectedCoupons = modalItems.filter((coupon) => coupon.isChecked);

    return selectedCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountAmount(coupon, totalPrice, calculateBOGODiscount(cartItems), specialDeliveryZone)
      );
    }, 0);
  }, [modalItems, cartItems, totalPrice, specialDeliveryZone]);

  return {
    modalCoupons: modalItems,
    selectCoupons,
    disCountPrice: couponDiscount,
    handleTempToggle,
    handleConfirm,
  };
};
