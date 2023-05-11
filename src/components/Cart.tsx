import { styled } from 'styled-components';
import { cartState } from './ProductItem';
import { selector, useRecoilValue } from 'recoil';

export const cartSelector = selector({
  key: 'cartSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const distinctProducts = new Set(cart);

    return distinctProducts.size;
  },
});

const Cart = () => {
  const total = useRecoilValue(cartSelector);

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
