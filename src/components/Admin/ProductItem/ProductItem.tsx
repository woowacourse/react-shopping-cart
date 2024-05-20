import useAddToCart from '../../../api/post/addToCart';
import { Product } from '../../../types/cartItem';
import * as S from './styled';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addToCart } = useAddToCart();

  const onAdd = async () => {
    await addToCart(product.id);
  };

  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <S.AddButton type="button" onClick={onAdd}>
          장바구니 추가
        </S.AddButton>
      </S.Header>
      <S.Contents>
        <S.ProductImage src={product.imageUrl} alt="product" />
        <S.ProductDescription>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ProductItem;
