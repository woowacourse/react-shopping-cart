import { Default, Minus, Plus } from '../../assets';
import { PatchCartItemProps } from '../../types/cartApi';
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
  handleSelectItem,
  onIncreaseCartItemClick,
  onDecreaseCartItemClick,
  onDeleteCartItemClick,
}: {
  cartItem: CartItemProps;
  isSelected: boolean;
  handleSelectItem: (cartItemId: number) => void;
  onIncreaseCartItemClick: ({
    cartItemId,
    quantity,
  }: PatchCartItemProps) => Promise<void>;
  onDecreaseCartItemClick: ({
    cartItemId,
    quantity,
  }: PatchCartItemProps) => Promise<void>;
  onDeleteCartItemClick: (cartItemId: number) => Promise<void>;
}) {
  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input
          type="checkbox"
          css={CheckboxStyle}
          checked={isSelected}
          onChange={() => handleSelectItem(cartItem.id)}
        />
        <button
          css={DeleteButtonStyle}
          onClick={() => onDeleteCartItemClick(cartItem.id)}
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
              onClick={() =>
                onDecreaseCartItemClick({
                  cartItemId: cartItem.id,
                  quantity: cartItem.quantity - 1,
                })
              }
            >
              <img src={Minus} alt="minus" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button
              css={ControllerButton}
              onClick={() =>
                onIncreaseCartItemClick({
                  cartItemId: cartItem.id,
                  quantity: cartItem.quantity + 1,
                })
              }
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
