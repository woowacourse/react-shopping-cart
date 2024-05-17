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
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 16px;
`;

export const PriceNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 35px;
`;
