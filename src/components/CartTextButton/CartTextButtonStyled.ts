import { styled } from "styled-components";

const Styled = {
  Container: styled.button`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 130px;

    cursor: pointer;
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

export default Styled;
