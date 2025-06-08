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
  const {
    quantity,
    product: { imageUrl, name, price },
  } = item;
  return (
    <li css={CartItemStyle}>
      <div css={CartItemBodyStyle}>
        <img css={ImageStyle} src={imageUrl || Default} alt={name} />

        <div css={CartInfo}>
          <Text varient="caption">{name}</Text>
          <Text varient="title">{price.toLocaleString()}원</Text>
          <div css={ControllerBox}>
            <Text varient="caption">{quantity}개</Text>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderCartItem;
