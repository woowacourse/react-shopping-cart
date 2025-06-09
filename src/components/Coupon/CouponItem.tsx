import styled from '@emotion/styled';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from '../SelectBox/SelectBox.styles';
import { CouponType } from '../../types/cart';
import { formatDate, formatTimeRange } from '../../utils/format';

interface CouponItemProps {
  coupon: CouponType;
  isSelected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

function CouponItem({ coupon, isSelected, disabled = false, onSelect }: CouponItemProps) {
  const { description, availableTime, expirationDate, minimumAmount } = coupon;

  return (
    <Container disabled={disabled}>
      <CouponHeader>
        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            disabled={disabled}
          />
          <StyledCheckbox checked={isSelected} />
        </CheckboxContainer>
        <CouponDescription>{description}</CouponDescription>
      </CouponHeader>
      <CouponExpirationDate>만료일: {formatDate(expirationDate)}</CouponExpirationDate>
      {minimumAmount && (
        <CouponMinimumAmount>최소 주문 금액: {minimumAmount}원</CouponMinimumAmount>
      )}
      {availableTime && (
        <CouponMinimumAmount>사용 가능 시간: {formatTimeRange(availableTime)}</CouponMinimumAmount>
      )}
    </Container>
  );
}
export default CouponItem;

const Container = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 12px 0 24px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.disabled ? '0.25' : '1')};
`;

const CouponHeader = styled.div`
  display: flex;
  margin-bottom: 12px;
  line-height: 18px;
`;

const CouponExpirationDate = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const CouponMinimumAmount = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  margin-top: 4px;
`;

const CouponDescription = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;
