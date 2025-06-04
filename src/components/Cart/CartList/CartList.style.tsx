import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 64px;
`;

export const UlContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #0000001a;
`;

export const TotalPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 96px;
`;

export const TotalPriceTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Notice = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  align-items: center;
`;
export const FreeShippingEligibilityNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const NoticeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const FreeShippingText = styled.p`
  height: 16px;
  color: #333333;
  font-size: 12px;
  font-weight: 600;
`;
export const FreeShippingEligibilityNotice = styled.p`
  color: #333333;
  font-size: 1.25rem;
  font-weight: 700;
`;
export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;
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

export const EmptyCartMessage = styled.p`
  color: #333333;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
  margin-top: 12px;
`;
