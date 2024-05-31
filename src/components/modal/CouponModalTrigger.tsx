import { useState } from 'react';
import CouponModal from './CouponModal';
import styles from './couponModal.module.css';
import Button from '@/components/common/Button';
import { FormattedCoupon } from '@/types';

type Props = {
  allCoupons: FormattedCoupon[];
};

export default function CouponModalTrigger({ allCoupons }: Props) {
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
      <CouponModal
        allCoupons={allCoupons}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      />
    </>
  );
}
