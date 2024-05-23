import { Modal } from 'brgndyy-react-modal';
import styles from './couponModal.module.css';
import Content from './Content';
import { FormattedCoupon } from '@/types';

type Props = {
  modalOpen: boolean;
  handleModalClose: () => void;
  allCoupons: FormattedCoupon[];
};

export default function CouponModal({ modalOpen, handleModalClose, allCoupons }: Props) {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={handleModalClose}
      position="center"
      mountAnimation={styles.modal_enter}
      unMountAnimation={styles.modal_exit}
      animationTime={300}
    >
      <Modal.Portal id="modal">
        <Modal.Backdrop opacity="rgba(0, 0, 0, 0.35)">
          <Modal.Container className="container">
            <Content handleModalClose={handleModalClose} allCoupons={allCoupons} />
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Portal>
    </Modal>
  );
}
