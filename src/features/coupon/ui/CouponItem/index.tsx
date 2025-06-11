import * as S from './CouponItem.styled';
import CheckBox from '@shared/ui/CheckBox';
import { formatAvailableTime, formatTime } from '@entities/coupon';

interface CouponItemProps {
  disabled: boolean;
  checked: boolean;
  title: string;
  expDate: string;
  minimumAmount?: number;
  availableTime?: {
    start: string;
    end: string;
  };
  onClick?: () => void;
}

export default function CouponItem({
  disabled = false,
  checked = false,
  title,
  expDate,
  minimumAmount,
  availableTime,
  onClick,
}: CouponItemProps) {
  const [year, month, date] = expDate.split('-');

  return (
    <S.Container $disabled={disabled} onClick={onClick}>
      <S.Header>
        <CheckBox isChecked={checked} aria-label="쿠폰 선택" disabled={disabled} />
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.TextContainer>
        <S.Text>
          만료일: {year}년 {month}월 {date}일
        </S.Text>
        {minimumAmount && <S.Text>최소 주문 금액: {minimumAmount.toLocaleString()}원</S.Text>}
        {availableTime && (
          <S.Text>
            사용 가능 시간:{' '}
            {formatAvailableTime(formatTime(availableTime.start), formatTime(availableTime.end))}
          </S.Text>
        )}
      </S.TextContainer>
    </S.Container>
  );
}
