import { image, itemBody, itemContentWrapper, itemWrapper, price } from '../styles/item';

import { CartItemProps } from '@/types/cartItem';

interface OrderItemProps {
  item: CartItemProps;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li css={itemWrapper}>
      <div css={itemBody}>
        <img css={image} src={item.product.imageUrl} width={112} height={112} />
        <div css={itemContentWrapper}>
          <span>{item.product.name}</span>
          <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
          <span>{item.quantity}개</span>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
