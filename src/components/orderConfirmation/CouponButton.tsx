import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { Button } from "../default";
import { couponUsedAtom } from "../../recoil/atom/atom";
import CouponModal from "./CouponModal";

const CouponButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setCouponUsed = useSetRecoilState(couponUsedAtom);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setCouponUsed(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    setCouponUsed(true);
  };

  return (
    <>
      <CouponModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />

      <Button
        variant="secondary"
        size="large"
        onClick={handleOpen}
      >
        쿠폰 적용
      </Button>
    </>
  );
};

export default CouponButton;
