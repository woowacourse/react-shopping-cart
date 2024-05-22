import React from 'react';
import { Modal, useModal } from 'woowacourse-react-modal-component';
import CouponModalContent from '../CouponModalContent/CouponModalContent';

function CouponButton() {
  const { isOpen, toggleModal } = useModal();
  // return <button onClick={toggleModal}>쿠폰 적용</button>;

  return (
    <>
      <button onClick={() => toggleModal()}>쿠폰 적용</button>

      <Modal isOpen={isOpen} toggleModal={toggleModal} size="small">
        <Modal.Header
          title="쿠폰을 선택해 주세요"
          closeOption="icon"
          handleCloseButton={toggleModal}
        />
        <CouponModalContent />
      </Modal>
    </>
  );
}

export default CouponButton;
