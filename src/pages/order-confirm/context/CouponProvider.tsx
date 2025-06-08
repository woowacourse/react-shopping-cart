import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";
import { optimizeCouponSelection } from "../order-contents/pay-contents/coupon-modal-content/utils/couponOptimizer";

interface CouponContextInterface {
  selectedCoupon: string[];
  handleCouponToggle: (couponId: string) => void;
  handleCouponSelectionIds: (couponIds: string[]) => void;
  initializeCoupons: (
    coupons: Coupon[],
    totalCartPrice: number,
    shippingFee: number,
    selectedCartItems: Cart[] | undefined
  ) => boolean;
}

const CouponContext = createContext<CouponContextInterface | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const [selectedCoupon, setSelectedCoupon] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    return () => {
      setIsInitialized(false);
    };
  }, []);

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

  const initializeCoupons = useCallback(
    (
      coupons: Coupon[],
      totalCartPrice: number,
      shippingFee: number,
      selectedCartItems: Cart[] | undefined
    ): boolean => {
      if (!isInitialized && coupons.length > 0) {
        const result = optimizeCouponSelection(
          coupons,
          totalCartPrice,
          shippingFee,
          selectedCartItems
        );
        setSelectedCoupon(result.selectedCouponIds);
        setIsInitialized(true);
        return result.selectedCouponIds.length > 0;
      }
      return false;
    },
    [isInitialized]
  );

  return (
    <CouponContext.Provider
      value={{
        selectedCoupon,
        handleCouponToggle,
        handleCouponSelectionIds,
        initializeCoupons,
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
