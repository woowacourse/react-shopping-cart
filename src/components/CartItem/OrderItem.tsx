import * as styles from './CartItem.style';
import { CartItemType } from '../../types/cartItem';

interface OrderItemProps {
  item: CartItemType;
}

function OrderItem({ item }: OrderItemProps) {
  const { id: cartItemId, product, quantity: cartQuantity } = item;
  const { name, price, imageUrl } = product;

  return (
    <div key={cartItemId} css={styles.cartItemFrameCss}>
      <div css={styles.cartItemInfoCss}>
        <img
          css={styles.cartItemImgCss}
          src={imageUrl || './assets/default.png'}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = './assets/default.png';
          }}
        />
        <div>
          <p>{name}</p>
          <p css={styles.cartItemPriceCss}>{(price * cartQuantity).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
