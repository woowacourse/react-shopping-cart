import * as S from './CouponModal.styled';
import { ClientCouponType } from '@entities/coupon/type/coupon.type';
import Modal from '@shared/components/Modal';
import CancelIcon from '@assets/icons/cancel.svg';
import CommonButton from '@shared/components/CommonButton';
import CouponList from '@features/coupon/ui/CouponList';
import { calculateCouponDiscountTotalPrice } from '@/features/coupon/utils/calculateCoupon';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientCoupons: ClientCouponType[];
  onCouponCheck: (couponId: number) => void;
}

export default function CouponModal({
  isOpen,
  onClose,
  clientCoupons,
  onCouponCheck,
}: CouponModalProps) {
  const discountPrice = calculateCouponDiscountTotalPrice(clientCoupons);
  const buttonText = `총 ${discountPrice.toLocaleString()}원 할인 쿠폰 사용하기`;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <S.Container>
        <S.Header>
          <S.Title>쿠폰을 선택해 주세요</S.Title>
          <S.CloseButton onClick={onClose}>
            <img src={CancelIcon} alt="close" />
          </S.CloseButton>
        </S.Header>
        <CouponList clientCoupons={clientCoupons} onCouponCheck={onCouponCheck} />
        <CommonButton colorType="black" buttonText={buttonText} onClick={onClose} />
      </S.Container>
    </Modal>
  );
}
