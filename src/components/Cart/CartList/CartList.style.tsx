import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const UlContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-bottom: 1px solid #0000001a;
`;

export const TotalPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const TotalPriceTitle = styled.p`
  display: flex;
  justify-content: space-between;
`;

export const TotalPrice = styled.p`
  display: flex;
  justify-content: space-between;
`;

export const TitleText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
export const PriceText = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  color: #ffffff;
  background-color: #333333;
  border: none;
  border-radius: 6px;

  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }
`;

export const ShippingFee = styled.p`
  display: flex;
  justify-content: space-between;
  color: #333333;
`;
