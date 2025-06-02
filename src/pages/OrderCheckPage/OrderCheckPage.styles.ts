import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 750px;
  gap: 12px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
  }
`;

export const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #0a0d13;
`;

export const PriceInfo = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

export const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;
