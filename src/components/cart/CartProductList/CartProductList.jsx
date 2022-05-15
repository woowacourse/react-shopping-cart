import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from '../../../store/actions/cart';
import CheckBox from '../../common/CheckBox/CheckBox';
import CartProductCard from '../CartProductCard/CartProductCard';
import * as Styled from './CartProductList.style';

function CartProductList() {
  const dispatch = useDispatch();

  const {
    cart: { cart },
    checkedProductList,
  } = useSelector(({ cart }) => cart);

  const cartLength = useMemo(() => cart && Object.keys(cart).length, [cart]);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isAllChecked = useMemo(
    () => cartLength === checkedProductList.length,
    [cartLength, checkedProductList],
  );

  const toggleAllCheck = () => {
    if (isAllChecked) {
      dispatch({
        type: 'UPDATE_CHECKED_LIST',
        payload: { checkedProductList: [] },
      });
      return;
    }
    dispatch({
      type: 'UPDATE_CHECKED_LIST',
      payload: { checkedProductList: Object.keys(cart) },
    });
  };

  return (
    <Styled.Container>
      <Styled.ListControlWrapper>
        <Styled.AllCheckControl>
          <CheckBox checked={isAllChecked} onClick={toggleAllCheck} />
          <Styled.CheckBoxLabel>
            {isAllChecked ? '전체 선택해제' : '전체 선택하기'}
          </Styled.CheckBoxLabel>
        </Styled.AllCheckControl>
        <Styled.Button type="button">선택 상품 삭제</Styled.Button>
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
