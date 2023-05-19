import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useProduct from '@Hooks/useProduct';
import useSelectedShoppingItem from '@Hooks/useSelectedShoppingItem';
import useShoppingCart from '@Hooks/useShoppingCart';

import cartItemState from '@Selector/cartItemState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/index';

import Trash from '@Asset/Trash.png';

import * as S from './style';

type ShoppingItemProps = {
  product: Product;
  width?: string;
  cartId: number;
};

function ShoppingItem({ product, width = '100%', cartId }: ShoppingItemProps) {
  const { isSelected, updateSelectedShoppingItem, popSelectedShoppingItem } = useSelectedShoppingItem();
  const { updateShoppingCart } = useShoppingCart();
  const { name, price, image, imageDescription } = useProduct(product);
  const { cartItemId, quantity } = product && useRecoilValue(cartItemState(product.id));

  const deleteShoppingItem = () => {
    if (!window.confirm(`${name} 상품을 장바구니에서 삭제하시겠습니까?`)) return;

    popSelectedShoppingItem(cartId);
    updateShoppingCart(`${FETCH_URL.cartItems}/${cartItemId}`, FETCH_METHOD.DELETE);
  };

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
        <S.DeleteButton src={Trash} onClick={deleteShoppingItem} />
        <QuantityController
          product={product}
          quantity={quantity}
          cartItemId={cartItemId}
          updateShoppingCart={updateShoppingCart}
        />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격">{price}</S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
}

export default ShoppingItem;
