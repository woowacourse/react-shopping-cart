import { Default } from '../../assets';
import { CartItemProps } from '../../types/cartItem';
import Text from '../common/Text/Text';
import {
  CartInfo,
  CartItemBodyStyle,
  CartItemStyle,
  ControllerBox,
  ImageStyle,
} from './CartItem.styles';

function OrderCartItem({ item }: { item: CartItemProps }) {
  const { quantity, product } = item;
  return (
    <li css={CartItemStyle}>
      <div css={CartItemBodyStyle}>
        <img
          css={ImageStyle}
          src={product.imageUrl || Default}
          alt={product.name}
        />

        <div css={CartInfo}>
          <Text varient="caption">{product.name}</Text>
          <Text varient="title">{product.price.toLocaleString()}원</Text>
          <div css={ControllerBox}>
            <Text varient="caption">{quantity}개</Text>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderCartItem;
