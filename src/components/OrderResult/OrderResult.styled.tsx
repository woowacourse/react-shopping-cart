import Styled from "@emotion/styled";

export const OrderResultWrapper = Styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const OrderResultTitle = Styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const OrderResultDescription = Styled.div`
  font-size: 12px;
  color: #666666;
  line-height: 1.5;
`;

export const OrderResultPriceTitle = Styled.p`
  font-size: 16px;
  font-weight: 700;
  margin-top: 24px;
`;

export const OrderResultPrice = Styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-top: 12px;
`;
