import { useRecoilState } from 'recoil';
import { Modal } from '@jaymyong66/simple-modal';
import { activeCouponsState, couponSelectedState, mockCoupons } from '../../../../store/atoms';
import NoticeLabel from '../../../../components/common/NoticeLabel/NoticeLabel';
import CouponItem from './CouponItem';
import styles from './CouponModal.module.css';
import { CouponType } from '../../../../types';

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

const findCouponByCode = (code: string) => {
  return mockCoupons.find((coupon) => coupon.code === code) as CouponType;
};

export default function CouponModal({ isOpen, handleToggle }: Props) {
  const [couponSelected, setCouponSelected] = useRecoilState(couponSelectedState);
  const [activeCoupons, setActiveCoupons] = useRecoilState(activeCouponsState);

  const isFulledActiveCoupons = activeCoupons.length === 2;

  const handleToggleCouponCheckbox = (code: string) => {
    const newCheckedState = !couponSelected[code];

    if (newCheckedState === true && activeCoupons.length >= 2) return;

    const newCouponSelected = {
      ...couponSelected,
      [code]: newCheckedState,
    };
    setCouponSelected(newCouponSelected);

    if (newCheckedState) {
      const newActiveCoupons = [...activeCoupons, findCouponByCode(code)];
      setActiveCoupons(newActiveCoupons);
    } else {
      const newActiveCoupons = activeCoupons.filter((coupon) => coupon.code !== code);
      setActiveCoupons(newActiveCoupons);
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
          return (
            <CouponItem
              key={coupon.code}
              coupon={coupon}
              isChecked={couponSelected[coupon.code]}
              isFulledActiveCoupons={isFulledActiveCoupons}
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
