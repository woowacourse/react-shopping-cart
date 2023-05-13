import { useRecoilValue } from 'recoil';

import QuantityController from '@Components/QuantityController';

import useShoppingCart from '@Hooks/useShoppingCart';

import quantityState from '@Selector/quantityState';

import * as S from './style';

type ProductItemProps = {
  product: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  isLoading: false;
};

function ProductItem({ product, isLoading }: ProductItemProps) {
  const { updateShoppingCart } = useShoppingCart();
  const quantity = useRecoilValue(quantityState(product.id));

  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <S.ProductItemImage src={product.imageUrl} alt={`${product.name} 사진`} />
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label={'판매 품목 이름'} isLoading={isLoading}>
            {product.name}
          </S.ProductItemName>
          <S.ProductItemPrice aria-label={'판매 품목 가격'} isLoading={isLoading}>
            {`${product.price.toLocaleString()} 원`}
          </S.ProductItemPrice>
        </S.ProductItemLayout>
        <QuantityController quantity={quantity} updateShoppingCart={updateShoppingCart} product={product} />
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
