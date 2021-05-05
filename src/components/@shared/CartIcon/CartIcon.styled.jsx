import styled, { css } from "styled-components";

const STYLE = {
  product: css`
    fill: black;
    border-radius: 100%;
    width: 65%;
  `,
};

export const CartIcon = styled.svg`
  fill: white;
  ${({ type }) => STYLE[type]}
`;
