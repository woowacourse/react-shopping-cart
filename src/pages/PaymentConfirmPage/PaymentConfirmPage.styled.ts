import styled from 'styled-components';

export const OrderConfirmPageContainer = styled.section`
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 64px * 2 - 48px - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  line-height: 34.7px;
`;

export const GuidText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

export const TotalPriceTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  margin-top: 24px;
  line-height: 16px;
`;

export const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.7px;
`;
