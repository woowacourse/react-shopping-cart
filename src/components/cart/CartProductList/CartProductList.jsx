import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useCartCheckedProducts from '../../../hooks/useCartCheckedProducts';
import CheckBox from '../../common/CheckBox/CheckBox';
import CartProductCard from '../CartProductCard/CartProductCard';
import * as Styled from './CartProductList.style';

function CartProductList() {
  const { cart } = useSelector(({ cart }) => cart);

  const { isAllChecked, toggleAllCheck, checkedProductCount, deleteCheckedProducts } =
    useCartCheckedProducts();

  const cartLength = useMemo(() => cart && Object.keys(cart).length, [cart]);

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
      </Styled.ListWrapper>
    </Styled.Container>
  );
}

export default CartProductList;
