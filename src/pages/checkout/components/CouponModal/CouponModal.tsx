import { useRecoilState } from 'recoil';
import { Modal } from '@jaymyong66/simple-modal';
import { activeCouponCodesState, couponSelectedState, mockCoupons } from '../../../../store/atoms';
import NoticeLabel from '../../../../components/common/NoticeLabel/NoticeLabel';
import CouponItem from './CouponItem';
import styles from './CouponModal.module.css';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function CouponModal({ isOpen, handleToggle }: Props) {
  const [couponSelected, setCouponSelected] = useRecoilState(couponSelectedState);
  const [activeCouponCodes, setActiveCouponCodes] = useRecoilState(activeCouponCodesState);

  const handleToggleCouponCheckbox = (toggledCouponCode: string) => {
    const newCheckedState = !couponSelected[toggledCouponCode];

    if (newCheckedState === true && activeCouponCodes.length >= 2) return;

    const newCouponSelected = {
      ...couponSelected,
      [toggledCouponCode]: newCheckedState,
    };
    setCouponSelected(newCouponSelected);

    if (newCheckedState) {
      const newActiveCoupons = [...activeCouponCodes, toggledCouponCode];
      setActiveCouponCodes(newActiveCoupons);
    } else {
      const newActiveCoupons = activeCouponCodes.filter((code) => code !== toggledCouponCode);
      setActiveCouponCodes(newActiveCoupons);
    }
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
        {mockCoupons.map((coupon) => {
          const isFulledActiveCoupons = activeCouponCodes.length === 2;
          const includeActiveCoupon = activeCouponCodes.includes(coupon.code);
          const isDisableCoupon = isFulledActiveCoupons && !includeActiveCoupon;
          return (
            <CouponItem
              key={coupon.code}
              coupon={coupon}
              isChecked={couponSelected[coupon.code]}
              isDisableCoupon={isDisableCoupon}
              onChange={() => {
                handleToggleCouponCheckbox(coupon.code);
              }}
            />
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
