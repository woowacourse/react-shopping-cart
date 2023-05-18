import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useProduct from '@Hooks/useProduct';
import useSelectedShoppingItem from '@Hooks/useSelectedShoppingItem';
import useShoppingCart from '@Hooks/useShoppingCart';

import cartItemState from '@Selector/cartItemState';

import Trash from '@Asset/Trash.png';

import * as S from './style';

type ShoppingItemProps = {
  product: Product;
  width?: string;
  cartId: number;
};

function ShoppingItem({ product, width = '100%', cartId }: ShoppingItemProps) {
  const { isSelected, updateSelectedShoppingItem } = useSelectedShoppingItem();
  const { updateShoppingCart } = useShoppingCart();
  const { name, price, image, imageDescription } = useProduct(product);
  const cartItem = product && useRecoilValue(cartItemState(product.id));

  return (
    <S.Container aria-label="장바구니 상품" width={width}>
      <Checkbox
        isChecked={isSelected(cartId)}
        size="small"
        updateSelectedState={() => updateSelectedShoppingItem(cartId)}
      />
      <S.ShoppingItemImage src={image} alt={imageDescription} aria-label="장바구니 상품 이미지" />
      <S.ShoppingItemName aria-label="장바구니 상품 이름">{name}</S.ShoppingItemName>
      <S.RightContents>
        <S.DeleteButton src={Trash} />
        <QuantityController
          product={product}
          quantity={cartItem.quantity}
          cartItemId={cartItem.cartItemId}
          updateShoppingCart={updateShoppingCart}
        />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격">{price}</S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
}

export default ShoppingItem;
