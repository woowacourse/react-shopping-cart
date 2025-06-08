import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './Modal.styles';
import { CouponsResponse } from '../../types/coupons';
import CouponList from './CouponList';

interface CouponModalProps {
  onClose: () => void;
  selectedCoupons: CouponsResponse[];
  setSelectedCoupons: (coupons: CouponsResponse[]) => void;
  totalDiscount: number;
}

export default function CouponModal({ onClose, selectedCoupons, setSelectedCoupons, totalDiscount }: CouponModalProps) {
  return (
    <S.Backdrop onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalTitleWrapper>
          <Text variant="title-1">쿠폰을 선택해 주세요</Text>
          <S.CloseButton onClick={onClose}>X</S.CloseButton>
        </S.ModalTitleWrapper>
        <Spacing size={34} />
        <InfoIcon /> 쿠폰은 최대 2개까지 사용할 수 있습니다.
        <S.ModalTitleLine />
        <CouponList selectedCoupons={selectedCoupons} setSelectedCoupons={setSelectedCoupons} />
        <S.CompleteButton onClick={onClose}>총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기</S.CompleteButton>
      </S.Modal>
    </S.Backdrop>
  );
}
