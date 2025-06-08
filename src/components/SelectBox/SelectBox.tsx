import styled from '@emotion/styled';
import { CartProduct } from '../../types/cart';
import { CheckboxContainer, HiddenCheckbox, ModifyRow, StyledCheckbox } from './SelectBox.styles';

interface SelectBoxProps {
  cartItem: CartProduct;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onDeleteClick: () => void;
}

function SelectBox({ cartItem, checked, onChange, onDeleteClick }: SelectBoxProps) {
  return (
    <ModifyRow>
      <CheckboxContainer>
        <HiddenCheckbox
          data-id={cartItem.id}
          type="checkbox"
          checked={checked}
          onChange={() => onChange(!checked)}
        />
        <StyledCheckbox checked={checked} />
      </CheckboxContainer>
      <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>
    </ModifyRow>
  );
}

export default SelectBox;

export const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
