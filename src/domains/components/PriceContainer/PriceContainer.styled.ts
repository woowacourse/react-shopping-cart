import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PriceBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  gap: 8px;
  border-top: 1px solid #e5e5e5;
`;
export const TotalPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  border-top: 1px solid #e5e5e5;
`;

export const PriceTextBox = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

export const PriceTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #0a0d13;
`;

export const PriceText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

export const PaymentTextBox = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;
