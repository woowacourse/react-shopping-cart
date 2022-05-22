import React, { useEffect } from 'react';

import useCart from 'hooks/useCart';
import useCartCheckedProducts from 'hooks/useCartCheckedProducts';

import CheckBox from 'components/common/CheckBox/CheckBox';
import ErrorContainer from 'components/common/ErrorContainer/ErrorContainer';

import CartProductCard from 'components/cart/CartProductCard/CartProductCard';
import * as Styled from 'components/cart/CartProductList/CartProductList.style';

function CartProductList() {
  const { cart, cartLength, loadCart } = useCart();
  const { isAllChecked, toggleAllCheck, checkedProductCount, deleteCheckedProducts } =
    useCartCheckedProducts();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Styled.Container>
      <Styled.ListControlWrapper>
        <Styled.AllCheckControl>
          <CheckBox checked={isAllChecked} onClick={toggleAllCheck} />
          <Styled.CheckBoxLabel>
            {isAllChecked ? '전체 선택해제' : '전체 선택하기'}
          </Styled.CheckBoxLabel>
        </Styled.AllCheckControl>
        {checkedProductCount !== 0 && (
          <Styled.Button type="button" onClick={deleteCheckedProducts}>
            선택 상품 삭제
          </Styled.Button>
        )}
      </Styled.ListControlWrapper>
      <Styled.Title>장바구니 상품 목록 ({cartLength}개)</Styled.Title>
      <Styled.ListWrapper>
        {cart &&
          Object.keys(cart).map((id) => {
            const { productData, quantity } = cart[id];

            return <CartProductCard key={id} product={productData} quantity={quantity} />;
          })}
        {cartLength === 0 && (
          <ErrorContainer>장바구니에 추가된 상품이 없어요 😥</ErrorContainer>
        )}
      </Styled.ListWrapper>
    </Styled.Container>
  );
}

export default CartProductList;
