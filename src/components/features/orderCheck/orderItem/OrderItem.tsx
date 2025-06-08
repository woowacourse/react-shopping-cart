import { isValidImageUrl } from '@/shared';
import { CartItemType } from '../../cart/types';
import * as S from './OrderItem.styles';
import defaultImage from '/assets/default_product.png';
import { Separator } from '@/components/common';

interface OrderItemProps {
  cartItem: CartItemType;
}

function OrderItem({ cartItem }: OrderItemProps) {
  return (
    <S.Container>
      <Separator />
      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage
            src={
              isValidImageUrl(cartItem.product.imageUrl)
                ? cartItem.product.imageUrl
                : defaultImage
            }
            alt="상품 이미지"
          />
        </S.PreviewBox>
        <S.InfoBox>
          <S.CartProductInfo>
            <S.CartProductTitle>{cartItem.product.name}</S.CartProductTitle>
            <S.CartProductPrice>
              {`${(
                cartItem.product.price * cartItem.quantity
              ).toLocaleString()}원`}
            </S.CartProductPrice>
          </S.CartProductInfo>
          <S.Text>{cartItem.quantity}개</S.Text>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Container>
  );
}

export default OrderItem;
