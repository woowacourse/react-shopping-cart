import { CartItemsResponse } from '../../types/cartItems';
import * as S from './OrderConfirmItem.styles';

interface OrderConfirmItemProps {
  item: CartItemsResponse['content'][number];
}

export default function OrderConfirmItem({ item }: OrderConfirmItemProps) {
  const {
    product: { imageUrl, name, price },
    quantity,
  } = item;

  return (
    <S.OrderItemWrapper>
      <S.OrderItemImageWrapper>
        <S.OrderItemImage
          src={imageUrl}
          alt={name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = 'images/default-img.png';
          }}
        />
      </S.OrderItemImageWrapper>
      <S.OrderItemInfoWrapper>
        <S.OrderItemName>{name}</S.OrderItemName>
        <S.OrderItemPrice>{price.toLocaleString()}원</S.OrderItemPrice>
        <S.OrderItemQuantity>{quantity}개</S.OrderItemQuantity>
      </S.OrderItemInfoWrapper>
    </S.OrderItemWrapper>
  );
}
