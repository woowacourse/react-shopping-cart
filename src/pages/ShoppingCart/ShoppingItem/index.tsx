import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product, UpdateShoppingCart } from '@Types/index';

import useProduct from '@Hooks/useProduct';
import useSelectedShoppingItem from '@Hooks/useSelectedShoppingItem';

import cartItemState from '@Selector/cartItemState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

import Trash from '@Asset/Trash.png';

import * as S from './style';

type ShoppingItemProps = {
  product?: Product;
  width?: string;
  cartId: number;
  isLoading?: boolean;
  updateShoppingCart: UpdateShoppingCart;
};

function ShoppingItem({ product, width = '100%', cartId, isLoading = false, updateShoppingCart }: ShoppingItemProps) {
  const { isSelected, updateSelectedShoppingItem, popSelectedShoppingItem } = useSelectedShoppingItem();

  const { name, price, image, imageDescription } = useProduct(product);
  const cartItem = product && useRecoilValue(cartItemState(product.id));

  const deleteShoppingItem = () => {
    if (!window.confirm(`${name} 상품을 장바구니에서 삭제하시겠습니까?`)) return;

    popSelectedShoppingItem(cartId);
    updateShoppingCart(`${FETCH_URL.cartItems}/${cartItem?.cartItemId}`, FETCH_METHOD.DELETE);
  };

  return (
    <S.Container aria-label="장바구니 상품" width={width}>
      <Checkbox
        isChecked={isSelected(cartId)}
        size="small"
        updateSelectedState={() => updateSelectedShoppingItem(cartId)}
      />
      <S.ShoppingItemImage src={image} alt={imageDescription} aria-label="장바구니 상품 이미지" />
      <S.ShoppingItemName aria-label="장바구니 상품 이름" isLoading={isLoading}>
        {name}
      </S.ShoppingItemName>
      <S.RightContents>
        <S.DeleteButton src={Trash} onClick={deleteShoppingItem} />
        <QuantityController
          product={product}
          quantity={cartItem?.quantity}
          cartItemId={cartItem?.cartItemId}
          updateShoppingCart={updateShoppingCart}
          isAbleSetZeroState={false}
        />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격" isLoading={isLoading}>
          {price}
        </S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
}

export default ShoppingItem;
