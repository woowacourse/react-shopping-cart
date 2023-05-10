import { styled } from 'styled-components';

const Cart = () => {
  return (
    <S.Wrapper>
      <S.Button>장바구니</S.Button>
      <S.Badge>0</S.Badge>
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
