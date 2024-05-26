import { Modal } from '@jaymyong66/simple-modal';
import NoticeLabel from '../../../../components/common/NoticeLabel/NoticeLabel';
import CouponList from './CouponList';
import { COUPON_POLICY } from '../../../../constants/policy';
import styles from './CouponModal.module.css';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function CouponModal({ isOpen, handleToggle }: Props) {
  return (
    <Modal
      position="center"
      size="medium"
      className={styles.couponModalContainer}
      isOpen={isOpen}
      onToggle={handleToggle}
    >
      <Modal.ModalHeader title="쿠폰을 선택해 주세요">
        <Modal.ModalCloseButton onClick={handleToggle} />
      </Modal.ModalHeader>

      <Modal.ModalContent className={styles.couponModalContentContainer}>
        <NoticeLabel>
          쿠폰은 최대 {COUPON_POLICY.max_active_coupon_amount}개까지 사용할 수 있습니다.
        </NoticeLabel>
        <CouponList />
      </Modal.ModalContent>

      <Modal.ModalFooter>
        <Modal.ModalButton variant="primary" style={{ width: '100%' }}>
          총 6,000원 할인 쿠폰 사용하기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
}
