import { createContext, useContext } from "react";
import useBooleanState from "../../../shared/hooks/common/useBooleanState";

interface CouponModalContextType {
  isCouponModalOpen: boolean;
  handleCouponModalOpen: () => void;
  handleCouponModalClose: () => void;
}

const CouponModalContext = createContext<CouponModalContextType | undefined>(undefined);

export const CouponModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCouponModalOpen, handleCouponModalOpen, handleCouponModalClose] = useBooleanState(false);

  return (
    <CouponModalContext.Provider value={{ isCouponModalOpen, handleCouponModalOpen, handleCouponModalClose }}>
      {children}
    </CouponModalContext.Provider>
  );
};

export const useCouponModalContext = () => {
  const context = useContext(CouponModalContext);
  if (!context) throw new Error("useCouponModal must be used within an CouponModalProvider");
  return context;
};
