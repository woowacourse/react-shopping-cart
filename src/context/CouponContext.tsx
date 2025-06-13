import { createContext, useContext, ReactNode } from 'react';
import { CouponType } from '../types/cart';
import { useOrderSummary } from '../hooks/useOrderSummary';
import { useShipping } from './ShippingContext';
import { calculateTotalDiscount, checkCouponAvailability } from '../utils/coupon';
import { useCouponSelection } from '../hooks/useCouponSelection';

interface CouponContextType {
  selectedCoupons: CouponType[];
  totalDiscount: number;
  handleCouponSelect: (coupon: CouponType) => void;
  checkCouponsDisable: (couponItem: CouponType, price: number) => boolean;
}

const CouponContext = createContext<CouponContextType | null>(null);

export function CouponProvider({ children }: { children: ReactNode }) {
  const { selectedCoupons, handleCouponSelect } = useCouponSelection();
  const { selectedCartItems, price, shippingFee } = useOrderSummary();
  const { isExtraShippingFee } = useShipping();

  const cart = {
    total: price,
    items: selectedCartItems,
    shippingFee,
    isExtraShippingFee,
    totalCount: selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
  };

  const totalDiscount = calculateTotalDiscount(selectedCoupons, cart);
  const checkCouponsDisable = (couponItem: CouponType, price: number) =>
    checkCouponAvailability(
      couponItem,
      price,
      selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
      cart,
    );

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
