import { CouponContent } from '@/api/type';
import CheckBox from '@/components/common/CheckBox';
import { formatKoreanTime } from '@/utils/formatKoreanTime';
import styled from '@emotion/styled';

interface CouponInfo {
  coupon: CouponContent;
  checked: boolean;
  disabled?: boolean;
  isAutoSelected?: boolean;
  onSelectionChange?: (isSelected: boolean) => void;
}

const CouponInfo = ({
  coupon,
  checked,
  disabled = false,
  onSelectionChange,
}: CouponInfo) => {
  const handleOnToggle = () => {
    if (!disabled) {
      onSelectionChange?.(!checked); // 부모에게 새로운 체크 상태 전달
    }
  };

  const expirationDate = coupon.expirationDate.split('-');

  return (
    <CouponInfoWrapper
      data-testid={`coupon-${coupon.id}`}
      data-disabled={disabled}
    >
      <CouponInfoTitle>
        <CheckBox
          isChecked={disabled ? false : checked}
          onToggle={handleOnToggle}
          disabled={disabled}
        />
        <Title $disabled={disabled}>{coupon.description}</Title>
      </CouponInfoTitle>
      <Detail $disabled={disabled}>
        만료일: {expirationDate[0]}년 {expirationDate[1]}월 {expirationDate[2]}
        일
      </Detail>
      {coupon.minimumAmount && (
        <Detail $disabled={disabled}>
          최소 주문 금액: {coupon.minimumAmount.toLocaleString()} 원
        </Detail>
      )}
      {coupon.availableTime && (
        <Detail $disabled={disabled}>
          사용 가능 시간: {formatKoreanTime(coupon.availableTime.start)}부터{' '}
          {formatKoreanTime(coupon.availableTime.end)}까지
        </Detail>
      )}
    </CouponInfoWrapper>
  );
};

export default CouponInfo;

const CouponInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0;
  border-top: 1px solid #e0e0e0;
  gap: 8px;
`;

const CouponInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
`;

const Title = styled.span<{ $disabled?: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ $disabled }) => ($disabled ? '#bbb' : '#000000')};
`;

const Detail = styled.div<{ $disabled?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $disabled }) => ($disabled ? '#bbb' : '#000000')};
`;
