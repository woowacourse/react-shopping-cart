import { isValidImageUrl } from '../../../../utils/isValidImageUrl';
import Separator from '../../../common/separator/Separator';
import { CartItemType } from '../../cart/types';
import * as S from './OrderItem.styles';
import defaultImage from '/assets/default_product.png';

interface OrderItemProps extends CartItemType {}

function OrderItem({ id, quantity, product }: OrderItemProps) {
  return (
    <S.Container data-testid={`OrderItem-${id}`}>
      <Separator />

      <S.InfoContainer>
        <S.PreviewBox>
          <S.PreviewImage
            src={
              isValidImageUrl(product.imageUrl)
                ? product.imageUrl
                : defaultImage
            }
            alt="상품 이미지"
          />
        </S.PreviewBox>
        <S.InfoBox>
          <S.CartProductInfo>
            <S.CartProductTitle>{product.name}</S.CartProductTitle>
            <S.CartProductPrice>
              {`${(product.price * quantity).toLocaleString()}원`}
            </S.CartProductPrice>
          </S.CartProductInfo>
          <S.Text>{quantity}개</S.Text>
        </S.InfoBox>
      </S.InfoContainer>
      <S.CouponButton>쿠폰 적용</S.CouponButton>
    </S.Container>
  );
}

export default OrderItem;
