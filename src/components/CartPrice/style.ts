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

export const PriceKind = styled.span`
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: 16px;
`;

export const PriceNumber = styled.span`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 35px;
`;
