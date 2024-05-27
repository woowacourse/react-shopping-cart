import React from "react";
import { Modal } from "lv2-modal-component";
import CouponList from "./CouponList";
import { selectedCouponDiscountPriceSelector } from "../recoil/coupon/couponState";
import { useRecoilValue } from "recoil";
import { formatCurrency } from "../utils/formatCurrency";
interface CouponModalProps {
  isOpen: boolean;
  closeModal: () => void;
  confirmModal: () => void;
}

const CouponModal = ({ isOpen, closeModal, confirmModal }: CouponModalProps) => {
  const discountPrice = useRecoilValue(selectedCouponDiscountPriceSelector);
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Modal.Positioner position="center">
        <Modal.Header title="쿠폰을 선택해 주세요" closeButton={true} onClose={closeModal} />
        <Modal.Content>
          <CouponList />
        </Modal.Content>
        <Modal.Footer
          confirmLabel={`총 ${formatCurrency(discountPrice)} 할인 쿠폰 사용하기`}
          onConfirm={confirmModal}
          align="vertical"
        ></Modal.Footer>
      </Modal.Positioner>
    </Modal>
  );
};

export default CouponModal;
