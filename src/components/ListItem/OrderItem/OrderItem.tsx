import ListItem from '../ListItem';
import Text from '../../@common/Text/Text';

import {
  ItemImageStyle,
  ListItemBodyStyle,
  ItemInfo,
} from '../ListItem.styles';
import { CartItemProps } from '../../../types/cartItem';
import { Default } from '../../../assets';
import { OrderItemQuantityStyle } from './OrderItem.styles';

function OrderItem({ cartItem }: { cartItem: CartItemProps }) {
  return (
    <ListItem>
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
          <div css={OrderItemQuantityStyle}>
            <Text varient="caption">{cartItem.quantity}개</Text>
          </div>
        </div>
      </div>
    </ListItem>
  );
}

export default OrderItem;
