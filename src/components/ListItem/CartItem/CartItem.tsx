import ListItem from '../ListItem';
import Text from '../../@common/Text/Text';

import { Default, Minus, Plus } from '../../../assets';
import { PatchCartItemProps } from '../../../types/cartApi';
import { CartItemProps } from '../../../types/cartItem';
import {
  CheckboxStyle,
  ControllerBox,
  ControllerButton,
  DeleteButtonStyle,
  CartItemHeaderStyle,
} from './CartItem.styles';
import {
  ListItemBodyStyle,
  ItemImageStyle,
  ItemInfo,
} from '../ListItem.styles';

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
    <ListItem>
      <div css={CartItemHeaderStyle}>
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
      <div css={ListItemBodyStyle}>
        <img
          css={ItemImageStyle}
          src={cartItem.product.imageUrl ?? Default}
          alt={cartItem.product.name}
        />

        <div css={ItemInfo}>
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
              <img src={Minus} alt="수량 줄이기 버튼" />
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
              <img src={Plus} alt="수량 늘리기 버튼" />
            </button>
          </div>
        </div>
      </div>
    </ListItem>
  );
}

export default CartItem;
