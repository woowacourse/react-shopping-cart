import { useState } from "react";

export const useModal = () => {
  const [showCouponModal, setShowCouponModal] = useState(false);

  const handleShowCouponModal = () => {
    setShowCouponModal((prev) => !prev);
  };

  return {
    showCouponModal,
    handleShowCouponModal,
  };
};
