import { getCoupon } from '../../apis/coupon';
import { useAPI } from '../../context/APIContext';
import { CouponsResponse } from '../../types/coupons';
import formatTime from '../../utils/formatTime';
import Checkbox from '../Checkbox/Checkbox';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './Modal.styles';

interface CouponModalProps {
  onClose: () => void;
}

export default function CouponModal({ onClose }: CouponModalProps) {
  const {
    data: coupons,
    isLoading,
    isError,
  } = useAPI<CouponsResponse[]>({
    name: 'coupons',
    fetcher: getCoupon,
  });

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
        {isLoading && <Text>불러오는 중...</Text>}
        {isError && <Text>쿠폰을 불러오지 못했습니다.</Text>}
        {coupons?.map((coupon) => (
          <S.CouponList key={coupon.id}>
            <S.CheckboxWrapper>
              <Checkbox />
              <Text variant="title-2">{coupon.description || `${coupon.discount ?? ''}원 할인 쿠폰`}</Text>
            </S.CheckboxWrapper>
            <Spacing size={10} />
            <S.ReceiptTextWrapper>
              <Text variant="title-3">만료일: {coupon.expirationDate}</Text>
            </S.ReceiptTextWrapper>
            {coupon.availableTime ? (
              <S.ReceiptTextWrapper>
                <Text variant="title-3">
                  사용 가능 시간: {formatTime(coupon.availableTime.start)}부터 {formatTime(coupon.availableTime.end)}
                  까지
                </Text>
              </S.ReceiptTextWrapper>
            ) : coupon.minimumAmount ? (
              <S.ReceiptTextWrapper>
                <Text variant="title-3">최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</Text>
              </S.ReceiptTextWrapper>
            ) : null}
            <Spacing size={16} />
            <S.ModalTitleLine />
          </S.CouponList>
        ))}
        <S.CompleteButton onClick={onClose}>총 {5000}원 할인 쿠폰 사용하기</S.CompleteButton>
      </S.Modal>
    </S.Backdrop>
  );
}
