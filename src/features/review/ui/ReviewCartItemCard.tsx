import * as S from './ReviewCartItemCard.styles';
import { CartItem } from '../../cart/api/types/cart';

interface CartItemCardProps {
  selectedCartItem: CartItem;
}

export default function ReviewCartItemCard({ selectedCartItem }: CartItemCardProps) {
  return (
    <S.ReviewCartItemContainer data-testid='cart-item-card'>
      <S.ReviewCartItemContent>
        <S.ReviewCartItemImage
          src={selectedCartItem.product.imageUrl}
          alt={selectedCartItem.product.name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-product.jpg';
          }}
        />
        <S.ReviewCartItemInfo>
          <S.ReviewCartItemInfoDetails>
            <S.ReviewCartItemInfoName data-testid='cart-item-name'>
              {selectedCartItem.product.name}
            </S.ReviewCartItemInfoName>
            <S.ReviewCartItemInfoPrice data-testid='card-item-price'>
              {selectedCartItem.product.price.toLocaleString()}원
            </S.ReviewCartItemInfoPrice>
            <S.ReviewCartItemInfoQuantity data-testid='cart-item-quantity'>
              {selectedCartItem.quantity}개
            </S.ReviewCartItemInfoQuantity>
          </S.ReviewCartItemInfoDetails>
        </S.ReviewCartItemInfo>
      </S.ReviewCartItemContent>
    </S.ReviewCartItemContainer>
  );
}
