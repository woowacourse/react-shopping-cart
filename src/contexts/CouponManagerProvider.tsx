import { createContext, PropsWithChildren, useContext, useState } from "react";
import { DiscountType } from "../types/coupon";

interface CouponContextType {
  selectedCoupon: DiscountType[];
  addCoupon: (couponType: DiscountType) => void;
  removeCoupon: (couponType: DiscountType) => void;
  isSelected: (couponType: DiscountType) => boolean;
}

const couponContext = createContext<CouponContextType>({
  selectedCoupon: [],
  addCoupon: () => {},
  removeCoupon: () => {},
  isSelected: () => false,
});

export function CouponManagerProvider({ children }: PropsWithChildren) {
  const [selectedCoupon, setSelectedCoupon] = useState<DiscountType[]>([]);

  function addCoupon(couponType: DiscountType) {
    setSelectedCoupon((prev) => {
      prev.push(couponType);
      return [...prev];
    });
  }

  function removeCoupon(couponType: DiscountType) {
    setSelectedCoupon((prev) => {
      const index = prev.indexOf(couponType);
      if (index > -1) {
        prev.splice(index, 1);
      }
      return [...prev];
    });
  }

  function isSelected(couponType: DiscountType) {
    return selectedCoupon.includes(couponType);
  }

  return (
    <couponContext.Provider
      value={{ selectedCoupon, addCoupon, removeCoupon, isSelected }}
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

// function useDiscount(price, cartList, 배송비, discountType[]: [CouponType, number]) {
//   const { isSelected } = useCouponManagerProvider();

//   // 1일 때는 순서대로 계산 한번만 하고 리턴

//   // 배열을 순서대로 한번 계산 and 거꾸로 한번 계산
//   // 더 큰 값을 리턴

//   if (!isSelected(couponType)) {
//     return 0;
//   }

//   switch (discountType) {
//     case "FIXED5000":
//       return 5000;
//     case "PERCENT30":
//       return Math.floor(price * 0.3);
//     case
//     default:
//       return 0;
//   }

//   return
// }
