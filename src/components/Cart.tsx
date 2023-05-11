import { styled } from 'styled-components';
import { cartState } from './ProductItem';
import { selector, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { setDataInLocalStorage } from '../utils/setDataInLocalStorage';

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProducts = new Set(cart);

    return selectedProducts;
  },
});

const Cart = () => {
  const selectedProducts = useRecoilValue(cartBadgeSelector);
  const cart = useRecoilValue(cartState);

  useEffect(() => {
    setDataInLocalStorage('cart', cart);
  }, [cart]);

  return (
    <S.Wrapper>
      <S.Button>장바구니</S.Button>
      <S.Badge>{selectedProducts.size}</S.Badge>
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
