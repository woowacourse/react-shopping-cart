import { HiddenCheckbox } from '../SelectBox/SelectBox.styles.ts';
import styled from '@emotion/styled';
import { CouponCheckboxContainer, CouponStyledCheckbox } from '../../pages/OrderConfirmPage';

interface DeliveryOptionsProps {
  checked: boolean;
  onToggle: () => void;
}

function DeliveryOptions({ checked, onToggle }: DeliveryOptionsProps) {
  return (
    <Container>
      <SectionTitle>배송 정보</SectionTitle>
      <DeliveryItem>
        <CouponCheckboxContainer>
          <HiddenCheckbox type="checkbox" checked={checked} onChange={onToggle} />
          <CouponStyledCheckbox checked={checked} />
        </CouponCheckboxContainer>
        <DeliveryText>제주도 및 도서 산간 지역</DeliveryText>
      </DeliveryItem>
    </Container>
  );
}

export default DeliveryOptions;

const Container = styled.div`
  margin-top: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const DeliveryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const DeliveryText = styled.p`
  font-size: 14px;
`;
