import styled, { css } from "styled-components";
import { COLOR } from "../../../constants/style";

const STYLE = {
  product: css`
    fill: ${COLOR.BLACK};
    border-radius: 100%;
    width: 65%;
    padding: 1px 2px 0 0;
  `,
};

export const CartIcon = styled.svg`
  fill: ${COLOR.WHITE};
  ${({ type }) => STYLE[type]}
`;
