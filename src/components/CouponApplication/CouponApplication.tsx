import { Modal } from 'hash-modal';
import { useState } from 'react';

const CouponApplication = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  const applyCoupon = () => {
    alert('모달 적용');
    modalClose();
  };

  return (
    <>
      {modalOpen && (
        <Modal modalSize="S" setModalClose={modalClose}>
          <Modal.Header
            setModalClose={modalClose}
            title="쿠폰을 선택해 주세요"
          ></Modal.Header>
          <Modal.Content>모달</Modal.Content>
          <Modal.Button
            onClick={applyCoupon}
            buttonSize="MAX"
            content="총 6,000원 할인 쿠폰 사용하기"
          />
        </Modal>
      )}
      <button onClick={() => setModalOpen(true)}>쿠폰 적용</button>
    </>
  );
};
export default CouponApplication;
