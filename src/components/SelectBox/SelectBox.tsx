import styled from '@emotion/styled';
import { CartProduct } from '../../types/cart';
import { CheckboxContainer, HiddenCheckbox, ModifyRow, StyledCheckbox } from './SelectBox.styles';

interface SelectBoxProps {
  cartItem: CartProduct;
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
  onRemove: () => void;
}

function SelectBox({ cartItem, checkedItems, setCheckedItems, onRemove }: SelectBoxProps) {
  return (
    <ModifyRow>
      <CheckboxContainer>
        <HiddenCheckbox
          data-id={cartItem.id}
          type="checkbox"
          onChange={() => {
            setCheckedItems((prev) =>
              prev.includes(cartItem.id)
                ? prev.filter((id) => id !== cartItem.id)
                : [...prev, cartItem.id],
            );
          }}
        />
        <StyledCheckbox checked={checkedItems.includes(cartItem.id)} />
      </CheckboxContainer>
      <DeleteButton onClick={onRemove}>삭제</DeleteButton>
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
