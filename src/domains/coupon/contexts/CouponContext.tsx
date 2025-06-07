import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { getCoupons } from "../apis/getCoupons";
import { MAX_COUPON_SELECTION } from "../constants";
import { Coupon } from "../types/response";
import useToast from "../../../features/toast/useToast";

interface CouponType {
  coupons: Coupon[];
  fetchData: () => Promise<void>;
  selectedCoupons: Coupon[];
  hasNoSelectedCoupons: boolean;
  toggleCouponSelection: (couponId: number) => void;
  isCouponSelected: (id: number) => boolean;
}

export const CouponContext = createContext<CouponType | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const { showToast } = useToast();
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      setCoupons(await getCoupons());
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  const toggleCouponSelection = useCallback(
    (couponId: number) => {
      setSelectedCouponIds((prev) => {
        if (prev.includes(couponId)) {
          return prev.filter((id) => id !== couponId);
        }

        if (prev.length >= MAX_COUPON_SELECTION) {
          showToast({
            message: `쿠폰은 최대 ${MAX_COUPON_SELECTION}개까지 적용 가능합니다.`,
            type: "error",
          });
          return prev;
        }

        return [...prev, couponId];
      });
    },
    [showToast]
  );

  const selectedCoupons = useMemo(
    () => coupons.filter((coupon) => selectedCouponIds.includes(coupon.id)),
    [coupons, selectedCouponIds]
  );

  const hasNoSelectedCoupons = useMemo(
    () => selectedCouponIds.length === 0,
    [selectedCouponIds.length]
  );

  const isCouponSelected = useCallback(
    (id: number) => selectedCouponIds.includes(id),
    [selectedCouponIds]
  );

  return (
    <CouponContext.Provider
      value={{
        coupons,
        fetchData,
        selectedCoupons,
        hasNoSelectedCoupons,
        toggleCouponSelection,
        isCouponSelected,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
