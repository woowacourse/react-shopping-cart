import Checkbox from '../Checkbox/Checkbox';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './Modal.styles';

interface CouponModalProps {
  onClose: () => void;
}

export default function CouponModal({ onClose }: CouponModalProps) {
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
        <S.CouponList>
          <S.CheckboxWrapper>
            <Checkbox />
            <Text variant="title-2">5000원 활인 쿠폰</Text>
          </S.CheckboxWrapper>
          <Spacing size={10} />
          <S.ReceiptTextWrapper>
            <Text variant="title-3">만료일: 2024년 11월 30일</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-3">최소 주문 금액: 100,000원</Text>
          </S.ReceiptTextWrapper>
        </S.CouponList>
        <S.ModalTitleLine />
        <Spacing size={24} />
        <S.CouponList>
          <S.CheckboxWrapper>
            <Checkbox />
            <Text variant="title-2">5000원 활인 쿠폰</Text>
          </S.CheckboxWrapper>
          <Spacing size={10} />
          <S.ReceiptTextWrapper>
            <Text variant="title-3">만료일: 2024년 11월 30일</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-3">최소 주문 금액: 100,000원</Text>
          </S.ReceiptTextWrapper>
        </S.CouponList>
        <S.CompleteButton onClick={onClose}>총 {5000}원 할인 쿠폰 사용하기</S.CompleteButton>
      </S.Modal>
    </S.Backdrop>
  );
}
