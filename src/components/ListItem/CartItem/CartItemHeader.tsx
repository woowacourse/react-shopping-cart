import Text from '../../@common/Text/Text';

import {
  CartItemHeaderStyle,
  CheckboxStyle,
  DeleteButtonStyle,
} from './CartItem.styles';

function CartItemHeader({
  cartItemId,
  isSelected,
  handleSelectItem,
  onDeleteCartItemClick,
}: {
  cartItemId: number;
  isSelected: boolean;
  handleSelectItem: (cartItemId: number) => void;
  onDeleteCartItemClick: (cartItemId: number) => void;
}) {
  return (
    <div css={CartItemHeaderStyle}>
      <input
        type="checkbox"
        css={CheckboxStyle}
        checked={isSelected}
        onChange={() => handleSelectItem(cartItemId)}
      />
      <button
        css={DeleteButtonStyle}
        onClick={() => onDeleteCartItemClick(cartItemId)}
      >
        <Text varient="caption">삭제</Text>
      </button>
    </div>
  );
}

export default CartItemHeader;
