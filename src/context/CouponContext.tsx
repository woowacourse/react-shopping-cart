import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { CartProduct, CouponType } from '../types/cart';
import { findBestCombo, generateCombos } from '../utils/coupon';

interface CouponContextType {
  selectedCoupons: CouponType[];
  totalDiscount: number;
  handleCouponSelect: (coupon: CouponType) => void;
  calculateTotalDiscount: (
    cartItems: CartProduct[],
    checkedItems: number[],
    price: number,
    shippingFee: number,
    isExtraShippingFee: boolean,
  ) => void;
  checkCouponsDisable: (couponItem: CouponType, price: number) => boolean;
}

const CouponContext = createContext<CouponContextType | null>(null);

export function CouponProvider({ children }: { children: ReactNode }) {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponType[]>([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

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
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, coupon];
    });
  };

  const calculateTotalDiscount = (
    cartItems: CartProduct[],
    checkedItems: number[],
    price: number,
    shippingFee: number,
    isExtraShippingFee: boolean,
  ) => {
    if (selectedCoupons.length > 0) {
      const cart = {
        total: price,
        items: cartItems,
        shippingFee,
        isExtraShippingFee,
        totalCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      };

      const combos = generateCombos(selectedCoupons, 2);
      const discount = findBestCombo(combos, cart, checkedItems);
      setTotalDiscount(discount);
    } else {
      setTotalDiscount(0);
    }
  };

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        totalDiscount,
        handleCouponSelect,
        calculateTotalDiscount,
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
