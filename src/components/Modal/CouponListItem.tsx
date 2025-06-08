import { CouponsResponse } from '../../types/coupons';
import Checkbox from '../Checkbox/Checkbox';
import Text from '../Text/Text';
import Spacing from '../Spacing/Spacing';
import formatTime from '../../utils/formatTime';
import * as S from './Modal.styles';

interface Props {
  coupon: CouponsResponse;
  isChecked: boolean;
  onToggle: () => void;
}

export default function CouponListItem({ coupon, isChecked, onToggle }: Props) {
  return (
    <S.CouponList>
      <S.CheckboxWrapper>
        <Checkbox checked={isChecked} onClick={onToggle} />
        <Text variant="title-2">{coupon.description || `${coupon.discount ?? ''}원 할인 쿠폰`}</Text>
      </S.CheckboxWrapper>
      <Spacing size={10} />
      <S.ReceiptTextWrapper>
        <Text variant="title-3">만료일: {coupon.expirationDate}</Text>
      </S.ReceiptTextWrapper>

      {coupon.availableTime ? (
        <S.ReceiptTextWrapper>
          <Text variant="title-3">
            사용 가능 시간: {formatTime(coupon.availableTime.start)}부터 {formatTime(coupon.availableTime.end)}까지
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
  );
}
