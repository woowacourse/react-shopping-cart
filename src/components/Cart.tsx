import { styled } from 'styled-components';
import { cartState } from './ProductItem';
import { selector, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProducts = new Set(cart);

    return selectedProducts.size;
  },
});

const Cart = () => {
  const total = useRecoilValue(cartBadgeSelector);
  const cart = useRecoilValue(cartState);
  const selectedCartList = Array.from(new Set(cart));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(selectedCartList));
  }, [selectedCartList]);

  return (
    <S.Wrapper>
      <S.Button>장바구니</S.Button>
      <S.Badge>{total}</S.Badge>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `,

  Button: styled.button`
    padding: 0;
    margin-right: 8px;
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: #fff;
  `,

  Badge: styled.div`
    width: 24px;
    height: 24px;
    background: #04c09e;
    border-radius: 50%;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
    color: #fff;
  `,
};

export default Cart;
