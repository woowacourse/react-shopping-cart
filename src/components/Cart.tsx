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
    margin: 0 227px 0 auto;
  `,

  Button: styled.button`
    margin-right: 8px;
    font-size: 24px;
    font-weight: 500;
    background: none;
    color: #fff;
  `,

  Badge: styled.div`
    width: 26px;
    height: 26px;
    background: #04c09e;
    color: #fff;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: 26px;
  `,
};

export default Cart;
