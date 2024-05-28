import { Product } from '@type/cartItem';
import * as S from './styled';
import addToCart from '@api/post/addToCart';
import useMutation from '@hooks/useMutation';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { mutate: addCartMutate } = useMutation<typeof addToCart>(addToCart, {
    onSuccess: () => alert(`${product.id} 등록완료`),
    onError: () => alert('장바구니 등록 실패'),
  });

  const onAdd = async () => {
    await addCartMutate(product.id);
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
