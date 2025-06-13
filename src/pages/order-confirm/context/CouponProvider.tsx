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
import { optimizeCouponSelection } from "../../../domain/coupon/utils/couponOptimizer";

interface CouponContextInterface {
  selectedCoupons: Coupon[];
  handleCouponToggle: (coupon: Coupon) => void;
  handleCouponSelection: (coupons: Coupon[]) => void;
  initializeCoupons: (
    coupons: Coupon[],
    totalCartPrice: number,
    shippingFee: number,
    selectedCartItems: Cart[] | undefined
  ) => boolean;
}

const CouponContext = createContext<CouponContextInterface | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    return () => {
      setIsInitialized(false);
    };
  }, []);

  const handleCouponToggle = useCallback(
    (coupon: Coupon) => {
      setSelectedCoupons((prev) => {
        if (prev.some((c) => c.id === coupon.id)) {
          return prev.filter((c) => c.id !== coupon.id);
        } else {
          if (prev.length >= 2) {
            return prev;
          }
          return [...prev, coupon];
        }
      });
    },
    [setSelectedCoupons]
  );

  const handleCouponSelection = useCallback(
    (coupons: Coupon[]) => {
      setSelectedCoupons(coupons);
    },
    [setSelectedCoupons]
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
          selectedCartItems,
          3
        );
        setSelectedCoupons(result.selectedCoupons);
        setIsInitialized(true);
        return result.selectedCoupons.length > 0;
      }
      return false;
    },
    [isInitialized]
  );

  return (
    <CouponContext.Provider
      value={{
        selectedCoupons,
        handleCouponToggle,
        handleCouponSelection,
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
