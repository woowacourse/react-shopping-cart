import { useCallback, useState } from 'react';

export const useModal = () => {
  const [showCouponModal, setShowCouponModal] = useState(false);

  const handleShowCouponModal = useCallback(() => {
    setShowCouponModal((prev) => !prev);
  }, []);

  return {
    showCouponModal,
    handleShowCouponModal,
  };
};
