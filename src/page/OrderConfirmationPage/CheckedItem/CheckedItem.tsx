import * as S from './style';

import { CartItem as CartItemType } from '../../../type';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CheckedItem({ cartItem }: CartItemProps) {
  return (
    <S.CartItemContainer>
      <S.CardItemContent>
        <S.ProductImageBox src={cartItem.product.imageUrl} alt={cartItem.product.name} />
        <S.ProductInfoBox>
          <div>
            <S.ProductName>{cartItem.product.name}</S.ProductName>
            <S.ProductPrice>{convertToLocaleAmount(cartItem.product.price)}</S.ProductPrice>
          </div>
          {`${cartItem.quantity}개`}
        </S.ProductInfoBox>
      </S.CardItemContent>
    </S.CartItemContainer>
  );
}
