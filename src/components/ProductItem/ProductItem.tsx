import * as S from './ProductItem.style';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
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
          <div>{name}</div>
          <div>{price}</div>
        </S.ProductInfo>
        {quantity > 0 ? <input type="number" /> : <button>🛒</button>}
      </S.ProductDetails>
    </S.ProductItemBox>
  );
}
export default ProductItem;
