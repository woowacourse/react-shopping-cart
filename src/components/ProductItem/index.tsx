import { useRecoilValue } from 'recoil';

import QuantityController from '@Components/QuantityController';

import useShoppingCart from '@Hooks/useShoppingCart';

import quantityState from '@Selector/quantityState';

import * as S from './style';

type ProductItemProps = {
  product?: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  isLoading: boolean;
};

function ProductItem({ product, isLoading }: ProductItemProps) {
  const { updateShoppingCart } = useShoppingCart();
  const quantity = product && useRecoilValue(quantityState(product.id));

  return (
    <S.Container aria-label={isLoading ? '하나의 판매 품목 정보 로딩 중' : '하나의 판매 품목 정보'}>
      <S.ProductItemImage src={product && product.imageUrl} alt={product && product.name}></S.ProductItemImage>
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label={product && '판매 품목 이름'} isLoading={isLoading}>
            {product ? product.name : '로딩중입니다.'}
          </S.ProductItemName>
          <S.ProductItemPrice aria-label={product && '판매 품목 가격'} isLoading={isLoading}>
            {product ? `${product.price.toLocaleString()} 원` : '로딩중입니다.'}
          </S.ProductItemPrice>
        </S.ProductItemLayout>
        {product && (
          <QuantityController quantity={quantity} updateShoppingCart={updateShoppingCart} product={product} />
        )}
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
