import { BasicModal } from "@dev-dino22/modal-components";
import { useState } from "react";
import Button from "../../../../components/common/Button";
import CouponModalContent from "./coupon-modal-content/CouponModalContent";

function CouponModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>쿠폰 적용</Button>
      {isOpen && (
        <BasicModal
          modalSize="medium"
          modalPosition="center"
          closeType="top"
          onClose={handleClose}
          titleText="쿠폰을 선택해주세요"
        >
          <CouponModalContent onClose={handleClose} />
        </BasicModal>
      )}
    </>
  );
}

export default CouponModalButton;
