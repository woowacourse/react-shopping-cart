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

function CartItem({ cartItem }: { cartItem: CartItemProps }) {
  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input type="checkbox" name="" id="" css={CheckboxStyle} />
        <button css={DeleteButtonStyle}>
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
            <button css={ControllerButton}>
              <img src={Minus} alt="minus" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button css={ControllerButton}>
              <img src={Plus} alt="plus" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
