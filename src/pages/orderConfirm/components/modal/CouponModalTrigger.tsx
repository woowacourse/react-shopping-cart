import { useState } from 'react';
import CouponModal from './CouponModal';
import styles from './couponModal.module.css';
import Button from '@/components/common/Button';

export default function CouponModalTrigger() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        aria-label="모달 트리거 버튼"
        className={styles.trigger_button}
        onClick={handleModalOpen}
      >
        쿠폰 적용
      </Button>
      <CouponModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
    </>
  );
}
