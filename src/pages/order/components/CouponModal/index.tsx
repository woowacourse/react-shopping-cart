import { useCouponModalContext } from "../../contexts/CouponModalContext";
import CouponModalContent from "./CouponModalContent";

const CouponModal = () => {
  const { isCouponModalOpen } = useCouponModalContext();

  if (!isCouponModalOpen) return null;
  return <CouponModalContent />;
};

export default CouponModal;
