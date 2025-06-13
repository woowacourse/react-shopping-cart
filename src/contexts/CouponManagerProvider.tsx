import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { CouponType } from "../types/coupon";

interface CouponContextType {
  selectedCoupon: CouponType[];
  addCoupon: (coupon: CouponType) => void;
  removeCoupon: (coupon: CouponType) => void;
  isSelected: (coupon: CouponType) => boolean;
  changeSelectedCoupon: (coupons: CouponType[]) => void;
}

const couponContext = createContext<CouponContextType>({
  selectedCoupon: [],
  addCoupon: () => {},
  removeCoupon: () => {},
  isSelected: () => false,
  changeSelectedCoupon: () => {},
});

export function CouponManagerProvider({ children }: PropsWithChildren) {
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType[]>([]);

  function addCoupon(coupon: CouponType) {
    setSelectedCoupon((prev) => {
      return [...prev, coupon];
    });
  }

  const removeCoupon = useCallback((coupon: CouponType) => {
    setSelectedCoupon((prev) => {
      const index = prev.indexOf(coupon);
      if (index > -1) {
        prev.splice(index, 1);
      }
      return [...prev];
    });
  }, []);

  const changeSelectedCoupon = useCallback((coupons: CouponType[]) => {
    setSelectedCoupon(coupons);
  }, []);

  function isSelected(coupon: CouponType) {
    return Boolean(selectedCoupon.find((item) => item.code === coupon.code));
  }

  return (
    <couponContext.Provider
      value={{
        selectedCoupon,
        addCoupon,
        removeCoupon,
        isSelected,
        changeSelectedCoupon,
      }}
    >
      {children}
    </couponContext.Provider>
  );
}

export function useCouponManagerProvider() {
  const context = useContext(couponContext);
  if (!context) {
    throw new Error("컨텍스트는 Provider 내부에서만 사용해야 합니다.");
  }
  return context;
}
