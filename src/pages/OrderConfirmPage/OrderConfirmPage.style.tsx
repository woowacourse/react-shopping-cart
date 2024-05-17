import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.boxHeight.md} * 2);
  text-align: center;
`;

export const OrderDetailText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const TotalPriceTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
`;

export const TotalPriceValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;
