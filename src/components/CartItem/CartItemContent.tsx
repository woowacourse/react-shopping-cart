import CountButtonContainer from './CountButtonContainer/CountButtonContainer';
import { image, itemBody, itemContentWrapper, price } from '../styles/item';

import { CartItemProps } from '@/types/cartItem';

interface CartItemContentProps {
  item: CartItemProps;
}

const CartItemContent = ({ item }: CartItemContentProps) => {
  return (
    <div css={itemBody}>
      <img css={image} src={item.product.imageUrl} width={112} height={112} />
      <div css={itemContentWrapper}>
        <span>{item.product.name}</span>
        <span css={price}>{item.product.price.toLocaleString('ko-KR')}원</span>
        <CountButtonContainer item={item} />
      </div>
    </div>
  );
};

export default CartItemContent;
