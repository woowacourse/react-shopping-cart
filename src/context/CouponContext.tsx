import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { CouponType } from '../types/cart';
import { findBestCombo, generateCombos } from '../utils/coupon';
import { MAX_COUPON_COUNT } from '../constants/coupon';
import { useOrderSummary } from '../hooks/useOrderSummary';
import { useShipping } from './ShippingContext';

interface CouponContextType {
  selectedCoupons: CouponType[];
  totalDiscount: number;
  handleCouponSelect: (coupon: CouponType) => void;
  checkCouponsDisable: (couponItem: CouponType, price: number) => boolean;
}

const CouponContext = createContext<CouponContextType | null>(null);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponType[]>([]);
  const { selectedCartItems, price, shippingFee } = useOrderSummary();
  const { isExtraShippingFee } = useShipping();

  const checkCouponsDisable = useCallback((couponItem: CouponType, price: number) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 8);

    if (couponItem.expirationDate) {
      const expirationDate = new Date(couponItem.expirationDate);
      if (now > expirationDate) {
        return true;
      }
    }

    if (couponItem.availableTime) {
      const { start, end } = couponItem.availableTime;
      if (currentTime < start || currentTime > end) {
        return true;
      }
    }

    if (couponItem.minimumAmount && couponItem.minimumAmount > price) {
      return true;
    }

    return false;
  }, []);

  const handleCouponSelect = (coupon: CouponType) => {
    setSelectedCoupons((prev) => {
      const isSelected = prev.some((c) => c.id === coupon.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== coupon.id);
      }
      if (prev.length >= MAX_COUPON_COUNT) {
        return prev;
      }
      return [...prev, coupon];
    });
  };

  const totalDiscount = useMemo(() => {
    if (selectedCoupons.length === 0) return 0;

    const cart = {
      total: price,
      items: selectedCartItems,
      shippingFee,
      isExtraShippingFee,
      totalCount: selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    };

    const combos = generateCombos(selectedCoupons, MAX_COUPON_COUNT);
    return findBestCombo(
      combos,
      cart,
      selectedCartItems.map((item) => item.id),
    );
  }, [selectedCoupons, selectedCartItems, price, shippingFee, isExtraShippingFee]);

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        totalDiscount,
        handleCouponSelect,
        checkCouponsDisable,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
}
