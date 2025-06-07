import styled from "@emotion/styled";

export const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4.5px;
  margin: 20px 0px;
`;

export const OrderText = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const OrderPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
`;

export const Description = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 13px 0px;
`;
