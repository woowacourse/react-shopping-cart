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
  const { imageUrl, name, price, id } = product;

  const { updateShoppingCart } = useShoppingCart();

  const quantity = useRecoilValue(quantityState(id));
  const priceText = price.toLocaleString();

  return (
    <S.Container aria-label="하나의 판매 품목 정보">
      <S.ProductItemImage src={imageUrl} alt={`${name} 사진`} />
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label={'판매 품목 이름'} isLoading={isLoading}>
            {name}
          </S.ProductItemName>
          <S.ProductItemPrice aria-label={'판매 품목 가격'} isLoading={isLoading}>
            {`${priceText} 원`}
          </S.ProductItemPrice>
        </S.ProductItemLayout>
        <QuantityController quantity={quantity} changeProductQuantity={updateShoppingCart(product)} />
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
