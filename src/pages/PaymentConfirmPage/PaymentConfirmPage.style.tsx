import styled from 'styled-components';
import theme from '../../styles/theme';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - ${theme.boxHeight} * 2);
  text-align: center;
`;

export const OrderDetailText = styled.p`
  font-size: ${theme.fontSize.sm};
  line-height: 1.5;
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const TotalPriceTitle = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;

export const TotalPriceValue = styled.p`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
`;
