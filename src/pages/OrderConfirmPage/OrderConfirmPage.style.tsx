import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
  width: 100%;
  height: calc(100vh - 128px);
  text-align: center;
`;

export const OrderDetailText = styled.p`
  font-size: 12px;
  line-height: 1.5;
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const TotalPriceTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
export const TotalPriceValue = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
