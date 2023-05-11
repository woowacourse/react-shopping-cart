import * as T from '../../types/types';
import CartController from '../CartController';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: T.ProductItem;
}

function ProductItem({ product }: ProductItemProps) {
  const { name, price, imageUrl } = product;
  return (
    <S.ProductItemBox>
      <S.ProductItemImageBox>
        <S.ProductItemImage src={imageUrl} />
      </S.ProductItemImageBox>
      <S.ProductDetails>
        <S.ProductInfo>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>{price}원</S.ProductPrice>
        </S.ProductInfo>
        <CartController product={product} />
      </S.ProductDetails>
    </S.ProductItemBox>
  );
}
export default ProductItem;
