import * as S from './OrderItem.styles';
import type { CartItemType } from '../../../types/response';

interface OrderItemProps {
  cartData: CartItemType;
}

const OrderItem = ({ cartData }: OrderItemProps) => {
  return (
    <div css={S.orderItemWrapper}>
      <div css={S.orderItemStyle}>
        <img src={cartData.product.imageUrl} alt={cartData.product.name} />
        <div css={S.orderInfoStyle}>
          <h3 css={S.orderItemNameStyle}>{cartData.product.name}</h3>
          <p css={S.orderItemPriceStyle}>
            {cartData.product.price.toLocaleString()}원
          </p>
          <p css={S.orderItemQuantityStyle}>{cartData.quantity}개</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
