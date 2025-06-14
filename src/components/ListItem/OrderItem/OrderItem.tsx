import ListItem from '../ListItem';
import ListItemBody from '../ListItemBody';
import ListItemInfo from '../ListItemInfo';
import Text from '../../@common/Text/Text';

import { CartItemProps } from '../../../types/cartItem';
import { OrderItemQuantityStyle } from './OrderItem.styles';

function OrderItem({ cartItem }: { cartItem: CartItemProps }) {
  return (
    <ListItem>
      <ListItemBody
        imageUrl={cartItem.product.imageUrl}
        name={cartItem.product.name}
      >
        <ListItemInfo
          name={cartItem.product.name}
          price={cartItem.product.price}
        >
          <div css={OrderItemQuantityStyle}>
            <Text variant="caption">{cartItem.quantity}개</Text>
          </div>
        </ListItemInfo>
      </ListItemBody>
    </ListItem>
  );
}

export default OrderItem;
