import styled, { keyframes } from "styled-components";
import { ColumnFlexWrapper } from "styles/Wrapper";

const scaleAnimation = keyframes`
  0%{}

  100%{
    transform: scale(1.04);
  }
`;

export const ProductCardBox = styled(ColumnFlexWrapper)`
  width: 220px;
  padding: 20px 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0.1, 0.1);
  cursor: pointer;
  :hover {
    animation: ${scaleAnimation} 0.5s ease-out;
    animation-fill-mode: forwards;
  }
`;
