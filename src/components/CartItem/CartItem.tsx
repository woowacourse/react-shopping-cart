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
  selected,
  onSelectChange,
  onIncreaseClick,
  onDecreaseClick,
  onDeleteClick,
}: {
  cartItem: CartItemProps;
  selected: boolean;
  onSelectChange: (cartItemId: number) => void;
  onIncreaseClick: (cartItem: CartItemProps) => Promise<void>;
  onDecreaseClick: (cartItem: CartItemProps) => Promise<void>;
  onDeleteClick: (cartItemId: number) => Promise<void>;
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
                  ? () => onDeleteClick(cartItem.id)
                  : () => onDecreaseClick(cartItem)
              }
            >
              <img src={Minus} alt="minus" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button
              css={ControllerButton}
              onClick={() => onIncreaseClick(cartItem)}
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
