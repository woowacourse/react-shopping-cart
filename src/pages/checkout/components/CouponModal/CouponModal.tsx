import { useRecoilState } from 'recoil';
import { Modal } from '@jaymyong66/simple-modal';
import { couponStatusState, mockCoupons } from '../../../../store/atoms';
import NoticeLabel from '../../../../components/common/NoticeLabel/NoticeLabel';
import CouponItem from './CouponItem';
import styles from './CouponModal.module.css';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function CouponModal({ isOpen, handleToggle }: Props) {
  const [couponChecked, setCouponChecked] = useRecoilState(couponStatusState);

  const handleToggleCouponCheckbox = (code: string) => {
    const newCheckCoupon = {
      ...couponChecked,
      [code]: {
        checked: !couponChecked[code].checked,
        isAvailable: couponChecked[code].isAvailable,
      },
    };
    setCouponChecked(newCheckCoupon);
  };

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
        <NoticeLabel>쿠폰은 최대 2개까지 사용할 수 있습니다.</NoticeLabel>
        {mockCoupons.map((coupon, idx) => {
          return (
            <>
              <CouponItem
                key={`coupon-${idx}`}
                coupon={coupon}
                isChecked={couponChecked[coupon.code].checked}
                onChange={() => {
                  handleToggleCouponCheckbox(coupon.code);
                }}
              />
            </>
          );
        })}
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Modal.ModalButton variant="primary" style={{ width: '100%' }}>
          총 6,000원 할인 쿠폰 사용하기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
}
