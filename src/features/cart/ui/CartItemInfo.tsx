import { CartItem } from '../types/cart';
import * as S from './CartItemInfo.style';

interface CartItemInfoProps {
  header?: React.ReactNode;
  cartItem: CartItem;
  quantityContent: React.ReactNode;
}

export default function CartItemInfo({ header, cartItem, quantityContent }: CartItemInfoProps) {
  return (
    <S.CartItemInfoContainer>
      {header}
      <S.CartItemContent>
        <S.CartItemImage
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = './default-product.jpg';
          }}
        />
        <S.CartItemInfo>
          <S.CartItemInfoDetails>
            <S.CartItemInfoName data-testid="cart-item-name">{cartItem.product.name}</S.CartItemInfoName>
            <S.CartItemInfoPrice data-testid="card-item-price">
              {cartItem.product.price.toLocaleString()}원
            </S.CartItemInfoPrice>
          </S.CartItemInfoDetails>
          {quantityContent}
        </S.CartItemInfo>
      </S.CartItemContent>
    </S.CartItemInfoContainer>
  );
}
