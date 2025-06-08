import { Default, Minus, Plus } from '../../assets';
import { CartItemProps } from '../../types/cartItem';
import Text from '../common/Text/Text';
import {
  CartInfo,
  CartItemBodyStyle,
  CartItemStyle,
  CheckboxStyle,
  ControllerBox,
  ControllerButton,
  DeleteButtonStyle,
  ImageStyle,
  ListItemHeaderStyle,
} from './CartItem.styles';
import { TEXT } from '../../constants/text';

function CartItem({
  cartItem,
  selected,
  onSelectChange,
  onIncreaseClick,
  onDecreaseClick,
  onDeleteClick,
}: {
  cartItem: CartItemProps;
  selected: boolean;
  onSelectChange: (cartItemId: number) => void;
  onIncreaseClick: (cartItem: CartItemProps) => void;
  onDecreaseClick: (cartItem: CartItemProps) => void;
  onDeleteClick: (cartItemId: number) => void;
}) {
  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input
          type="checkbox"
          css={CheckboxStyle}
          checked={selected}
          onChange={() => onSelectChange(cartItem.id)}
        />
        <button
          css={DeleteButtonStyle}
          onClick={() => onDeleteClick(cartItem.id)}
        >
          <Text varient="caption">{TEXT.DELETE}</Text>
        </button>
      </div>
      <div css={CartItemBodyStyle}>
        <img
          css={ImageStyle}
          src={cartItem.product.imageUrl ?? Default}
          alt={cartItem.product.name}
        />

        <div css={CartInfo}>
          <Text varient="caption">{cartItem.product.name}</Text>
          <Text varient="title">
            {cartItem.product.price.toLocaleString()}원
          </Text>
          <div css={ControllerBox}>
            <button
              css={ControllerButton}
              onClick={
                cartItem.quantity === 1
                  ? () => onDeleteClick(cartItem.id)
                  : () => onDecreaseClick(cartItem)
              }
            >
              <img src={Minus} alt="마이너스 버튼" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button
              css={ControllerButton}
              onClick={() => onIncreaseClick(cartItem)}
            >
              <img src={Plus} alt="플러스 버튼" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
