import React from "react";
import { Modal, useModalState } from "lv2-modal-component";
import CouponList from "./CouponList";
interface CouponModalProps {
  isOpen: boolean;
  closeModal: () => void;
  confirmModal: () => void;
}

const CouponModal = ({ isOpen, closeModal, confirmModal }: CouponModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <Modal.Positioner
        position="center"
        size="medium"
      >
        <Modal.Header
          title="쿠폰을 선택해 주세요"
          closeButton={true}
          onClose={closeModal}
        />
        <Modal.Content>
          <CouponList />
        </Modal.Content>
        <Modal.Footer
          confirmLabel="총 xx원 할인 쿠폰 사용하기"
          onConfirm={confirmModal}
          align="vertical"
        ></Modal.Footer>
      </Modal.Positioner>
    </Modal>
  );
};

export default CouponModal;
