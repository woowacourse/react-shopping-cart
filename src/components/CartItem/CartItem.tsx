import { Default, Minus, Plus } from '../../assets';
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

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    category: string;
  };
}

function CartItem({ cartItem }: { cartItem: CartItem }) {
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
