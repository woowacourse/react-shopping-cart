import styled from "styled-components";
import { PriceStyleProps } from "./CartPrcie";

export const Wrapper = styled.section``;

export const Price = styled.div<PriceStyleProps>`
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 12px;
  border-top: ${({ $borderTop }) => $borderTop || "none"};
`;
