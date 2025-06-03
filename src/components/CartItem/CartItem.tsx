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

function CartItem({
  cartItem,
  isSelected,
  onSelectItem,
  onIncreaseCartItem,
  onDecreaseCartItem,
  onDeleteCartItem,
}: {
  cartItem: CartItemProps;
  isSelected: boolean;
  onSelectItem: (cartItemId: number) => void;
  onIncreaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  onDecreaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  onDeleteCartItem: (cartItemId: number) => Promise<void>;
}) {
  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input
          type="checkbox"
          css={CheckboxStyle}
          checked={isSelected}
          onChange={() => onSelectItem(cartItem.id)}
        />
        <button
          css={DeleteButtonStyle}
          onClick={() => onDeleteCartItem(cartItem.id)}
        >
          <Text varient="caption">삭제</Text>
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
                  ? () => onDeleteCartItem(cartItem.id)
                  : () => onDecreaseCartItem(cartItem)
              }
            >
              <img src={Minus} alt="minus" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button
              css={ControllerButton}
              onClick={() => onIncreaseCartItem(cartItem)}
            >
              <img src={Plus} alt="plus" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
