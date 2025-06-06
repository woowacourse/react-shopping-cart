import styled from '@emotion/styled';
import CheckBox from '@/components/common/CheckBox';

interface DeliveryRegionCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
}

const DeliveryRegionCheckbox = ({
  checked,
  onToggle,
  label,
  disabled = false,
}: DeliveryRegionCheckboxProps) => {
  return (
    <Container>
      <CheckBox isChecked={checked} onToggle={onToggle} disabled={disabled} />
      <Message>{label}</Message>
    </Container>
  );
};

export default DeliveryRegionCheckbox;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
`;

const Message = styled.p`
  font-size: 12px;
  font-weight: 500;
`;
