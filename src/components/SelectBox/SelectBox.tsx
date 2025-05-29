import { CartProduct } from '../../types/cart';
import {
  CheckboxContainer,
  DeleteButton,
  HiddenCheckbox,
  ModifyRow,
  StyledCheckbox,
} from '../Cart/Cart.styles';

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
