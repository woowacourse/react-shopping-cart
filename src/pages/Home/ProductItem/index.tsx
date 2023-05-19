import { useRecoilValue } from 'recoil';

import QuantityController from '@Components/QuantityController';

import { UpdateShoppingCart } from '@Types/index';

import useProduct from '@Hooks/useProduct';

import cartItemState from '@Selector/cartItemState';

import * as S from './style';

type ProductItemProps = {
  product?: {
    id: number;
    price: number;
    name: string;
    imageUrl: string;
  };
  isLoading?: boolean;
  width?: string;
  updateShoppingCart: UpdateShoppingCart;
};

function ProductItem({ product, isLoading = false, width, updateShoppingCart }: ProductItemProps) {
  const { name, price, image, imageDescription } = useProduct(product);
  const cartItem = product && useRecoilValue(cartItemState(product.id));

  return (
    <S.Container aria-label="하나의 판매 품목 정보" width={width}>
      <S.ProductItemImage src={image} alt={imageDescription}></S.ProductItemImage>
      <S.ProductItemContents>
        <S.ProductItemLayout>
          <S.ProductItemName aria-label="판매 품목 이름" isLoading={isLoading}>
            {name}
          </S.ProductItemName>
          <S.ProductItemPrice aria-label="판매 품목 가격" isLoading={isLoading}>
            {price}
          </S.ProductItemPrice>
        </S.ProductItemLayout>
        {product && (
          <QuantityController
            quantity={cartItem?.quantity}
            cartItemId={cartItem?.cartItemId}
            product={product}
            updateShoppingCart={updateShoppingCart}
          />
        )}
      </S.ProductItemContents>
    </S.Container>
  );
}

export default ProductItem;
