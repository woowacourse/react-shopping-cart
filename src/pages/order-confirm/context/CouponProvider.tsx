import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";
import { optimizeCouponSelection } from "../order-contents/pay-contents/coupon-modal-content/utils/couponOptimizer";
interface CouponContextInterface {
  selectedCoupon: string[];
  handleCouponToggle: (couponId: string) => void;
  handleCouponSelectionIds: (couponIds: string[]) => void;
  autoSelectOptimalCoupon: (
    coupons: Coupon[],
    totalCartPrice: number,
    shippingFee: number,
    selectedCartItems: Cart[] | undefined
  ) => void;
}

const CouponContext = createContext<CouponContextInterface | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const [selectedCoupon, setSelectedCoupon] = useState<string[]>([]);

  const handleCouponToggle = useCallback(
    (couponId: string) => {
      setSelectedCoupon((prev) => {
        if (prev.includes(couponId)) {
          return prev.filter((id) => id !== couponId);
        } else {
          if (prev.length >= 2) {
            return prev;
          }
          return [...prev, couponId];
        }
      });
    },
    [setSelectedCoupon]
  );

  const handleCouponSelectionIds = useCallback(
    (couponIds: string[]) => {
      setSelectedCoupon(couponIds);
    },
    [setSelectedCoupon]
  );

  const autoSelectOptimalCoupon = useCallback(
    (
      coupons: Coupon[],
      totalCartPrice: number,
      shippingFee: number,
      selectedCartItems: Cart[] | undefined
    ) => {
      const result = optimizeCouponSelection(
        coupons,
        totalCartPrice,
        shippingFee,
        selectedCartItems
      );
      setSelectedCoupon(result.selectedCouponIds);
    },
    [setSelectedCoupon]
  );

  return (
    <CouponContext.Provider
      value={{
        selectedCoupon,
        handleCouponToggle,
        handleCouponSelectionIds,
        autoSelectOptimalCoupon,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext 는 CouponProvider 안에서 사용해주세요.");
  }
  return context;
};
