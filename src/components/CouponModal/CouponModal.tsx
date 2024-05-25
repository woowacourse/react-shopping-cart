import React from 'react';
import { Modal } from 'woowacourse-react-modal-component';
import CouponModalContent from '../CouponModalContent/CouponModalContent';

interface CouponModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
}

function CouponModal({ isOpen, onToggleModal }: CouponModalProps) {
  return (
    <Modal isOpen={isOpen} toggleModal={onToggleModal} size="small">
      <Modal.Header
        title="쿠폰을 선택해 주세요"
        closeOption="icon"
        handleCloseButton={onToggleModal}
      />
      <CouponModalContent toggleModal={onToggleModal} />
    </Modal>
  );
}

export default CouponModal;
