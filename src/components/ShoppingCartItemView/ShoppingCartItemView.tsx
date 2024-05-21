import { CartItem } from '../../types/cartItem';
import * as S from './styled';

interface ShoppingCartItemViewProps {
  cartItem: CartItem;
}

const ShoppingCartItemView = ({ cartItem }: ShoppingCartItemViewProps) => {
  return (
    <S.Container>
      <S.Hr />
      <S.Contents>
        <S.ProductImage src={cartItem.product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{cartItem.product.name}</S.ProductName>
          <S.ProductPrice>{cartItem.product.price.toLocaleString()}원</S.ProductPrice>
          <p>{cartItem.quantity}개</p>
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItemView;
