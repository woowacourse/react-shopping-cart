import { createContext, useContext, useState } from "react";
import { Coupon } from "../apis/coupons";
import { useCartItemContext } from "./CartItemContext";
import { useCouponValidation } from "../hooks/useCouponValidation";

interface CouponContextType {
  selectedCoupons: Coupon[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  appliedCoupons: Coupon[];
  setAppliedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
}

interface CouponProviderProps {
  children: React.ReactNode;
}

const CouponContext = createContext<CouponContextType | null>(null);

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};

export const CouponProvider = ({ children }: CouponProviderProps) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([]);

  const { cartItems, selectedItem } = useCartItemContext();

  const currentOrderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  useCouponValidation(
    appliedCoupons,
    currentOrderPrice,
    setAppliedCoupons,
    setSelectedCoupons
  );

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        setSelectedCoupons,
        appliedCoupons,
        setAppliedCoupons,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
