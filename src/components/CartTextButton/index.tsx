import { styled } from 'styled-components';

const CartTextButton = () => {
  return (
    <Styled.Container>
      <Styled.ShoppingCart>장바구니</Styled.ShoppingCart>
      <Styled.CartQuantity>2</Styled.CartQuantity>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  ShoppingCart: styled.h2`
    font-size: 24px;
    color: #fff;
  `,

  CartQuantity: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;

    background: #04c09e;
    border-radius: 100%;

    font-size: 16px;
    font-weight: bold;
    color: #fff;
  `,
};

export default CartTextButton;
