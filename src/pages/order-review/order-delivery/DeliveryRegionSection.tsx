import styled from '@emotion/styled';
import DeliveryRegionCheckbox from './DeliveryRegionCheckbox';

interface DeliveryRegionSectionProps {
  checked: boolean;
  onToggle: () => void;
}

const DeliveryRegionSection = ({
  checked,
  onToggle,
}: DeliveryRegionSectionProps) => (
  <DeliveryRegionCheckboxContainer>
    <DeliveryCheckboxTitle>배송 정보</DeliveryCheckboxTitle>
    <DeliveryRegionCheckbox
      checked={checked}
      onToggle={onToggle}
      label='제주도 및 도서 산간 지역'
    />
  </DeliveryRegionCheckboxContainer>
);

export default DeliveryRegionSection;

const DeliveryCheckboxTitle = styled.h2`
  font-weight: 700;
  font-size: 16px;
`;

const DeliveryRegionCheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 0;
`;
