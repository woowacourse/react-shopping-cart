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
import { useCartContext } from '../../context/CartContext';

function CartItem({
  cartItem,
  selected,
}: {
  cartItem: CartItemProps;
  selected: boolean;
}) {
  const cart = useCartContext();

  return (
    <li css={CartItemStyle}>
      <div css={ListItemHeaderStyle}>
        <input
          type="checkbox"
          css={CheckboxStyle}
          checked={selected}
          onChange={() => cart.selectItem(cartItem.id)}
        />
        <button
          css={DeleteButtonStyle}
          onClick={() => cart.deleteCartItem(cartItem.id)}
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
                  ? () => cart.deleteCartItem(cartItem.id)
                  : () => cart.decreaseCartItem(cartItem)
              }
            >
              <img src={Minus} alt="마이너스 버튼" />
            </button>
            <Text varient="caption">{cartItem.quantity}</Text>
            <button
              css={ControllerButton}
              onClick={() => cart.increaseCartItem(cartItem)}
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
