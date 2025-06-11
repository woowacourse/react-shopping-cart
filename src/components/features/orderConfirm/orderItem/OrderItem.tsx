import { isValidImageUrl } from '../../../../utils/isValidImageUrl';
import FallbackImage from '../../../common/fallbackImage/FallbackImage';
import Separator from '../../../common/separator/Separator';
import { CartItemType } from '../../cart/types';
import * as S from './OrderItem.styles';

interface OrderItemProps extends CartItemType {}

function OrderItem({ id, quantity, product }: OrderItemProps) {
  return (
    <S.Container data-testid={`OrderItem-${id}`}>
      <Separator />
      <S.InfoContainer>
        <S.PreviewBox>
          {isValidImageUrl(product.imageUrl) ? (
            <S.PreviewImage src={product.imageUrl} alt="상품 이미지" />
          ) : (
            <FallbackImage />
          )}
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
    </S.Container>
  );
}

export default OrderItem;
