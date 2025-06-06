import styled from '@emotion/styled';
import { CartProduct } from '../../types/cart';
import { CheckboxContainer, HiddenCheckbox, ModifyRow, StyledCheckbox } from './SelectBox.styles';
import { useCartSelectContext } from '../../context/CartSelectContext';

interface SelectBoxProps {
  cartItem: CartProduct;
  onRemove: () => void;
  isLoading: boolean;
}

function SelectBox({ cartItem, onRemove, isLoading }: SelectBoxProps) {
  const { checkedItems, toggleItem } = useCartSelectContext();

  return (
    <ModifyRow>
      <CheckboxContainer>
        <HiddenCheckbox
          data-id={cartItem.id}
          type="checkbox"
          onChange={() => {
            toggleItem(cartItem.id);
          }}
        />
        <StyledCheckbox checked={checkedItems.includes(cartItem.id)} />
      </CheckboxContainer>
      <DeleteButton disabled={isLoading} onClick={onRemove}>
        삭제
      </DeleteButton>
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
