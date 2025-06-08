import styled from '@emotion/styled';
import Modal from './commons/Modal';
import InlineNotice from './InlineNotice';
import CouponCard from './couponCard/CouponCard';
import { useCouponsContext } from '../contexts/Coupons/CouponsContext';

type CouponModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const {
    coupons,
    validCoupons,
    selectedCoupons,
    couponDiscount,
    selectCoupon,
    unselectCoupon,
  } = useCouponsContext();

  const toggleCoupon = (couponId: number) => {
    const isSelected = selectedCoupons.some((coupon) => coupon.id === couponId);

    if (!isSelected) {
      selectCoupon(couponId);
    } else {
      unselectCoupon(couponId);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Title
        title="쿠폰을 선택해 주세요"
        fontSize="16px"
        fontWeight="700"
      />
      <Modal.CloseButton />
      <Modal.Contents>
        <S.contentsContainer>
          <InlineNotice text="쿠폰은 최대 2개까지 사용할 수 있습니다" />
          {coupons.map((coupon) => {
            const isSelected = selectedCoupons.some(
              (selectedCoupon) => selectedCoupon.id === coupon.id
            );
            const isValid =
              validCoupons.some(
                (validCoupon) => validCoupon.id === coupon.id
              ) && selectedCoupons.length < 2;

            return (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isSelected={isSelected}
                isValid={isValid || isSelected}
                onClick={() => toggleCoupon(coupon.id)}
              />
            );
          })}
        </S.contentsContainer>
      </Modal.Contents>
      <Modal.Button
        title={`총 ${couponDiscount}원 할인 쿠폰 사용하기`}
        backgroundColor="#333333"
        textColor="#ffffff"
        onClick={() => {
          // 쿠폰 적용 로직 추가
          onClose();
        }}
      />
    </Modal>
  );
};

const S = {
  contentsContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
};

export default CouponModal;
