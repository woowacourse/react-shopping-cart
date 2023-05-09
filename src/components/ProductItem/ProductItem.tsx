import * as T from '../../types/ProductType';
import CartController from '../CartController';
import * as S from './ProductItem.style';

interface ProductItemProps extends T.ProductItem {
  quantity: number;
}

function ProductItem({ id, name, price, imageUrl, quantity }: ProductItemProps) {
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
        <CartController quantity={quantity} />
      </S.ProductDetails>
    </S.ProductItemBox>
  );
}
export default ProductItem;
