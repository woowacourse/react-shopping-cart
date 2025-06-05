import styled from "@emotion/styled";

export const OrderConfirmButton = styled.button`
  width: 100%;
  max-width: 430px;
  background-color: #000000;
  color: #ffffff;

  bottom: 0;

  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 1000;

  font-size: 16px;
  font-weight: 700;

  a {
    text-decoration: none;
  }
  transform: translateX(-50%);
  left: 50%;

  &:disabled {
    background-color: rgb(105, 105, 105);
    cursor: not-allowed;
  }
`;

export const CouponButton = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 4px;
  max-width: 430px;
  background-color: #ffffff;
  color: #222222;
  border: 1px solid #aaaaaa;
  margin: 16px 0;
`;

export const Header = styled.header`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const HeaderTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
`;

export const HeaderDescription = styled.p`
  font-weight: 500;
  font-size: 12px;
  span {
    display: block;
  }
`;

export const OrderTotal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid #0000001a;
`;

export const OrderTotalTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

export const OrderTotalPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
`;

export const DiscountTotal = styled.p`
  display: flex;
  justify-content: space-between;
  color: #333333;
`;

export const DiscountTotalTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

export const DiscountTotalPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const FinalTotal = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;
`;

export const FinalTotalTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

export const FinalTotalPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
`;
export const OrderPriceDetails = styled.ul`
  border-top: 1px solid #0000001a;

  border-bottom: 1px solid #0000001a;
  padding: 16px 0;

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const OrderWrapper = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FinalTotalWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
`;
export const CouponComboNotice = styled.p`
  font-size: 1rem;
  color: #333333;
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: center;
`;
export const ShippingIsland = styled.div`
  margin-bottom: 8px;
`;

export const ShippingIslandTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;

export const ShippingIslandDescription = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const ShippingIslandWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const OrderPriceDetailWrapper = styled.div`
  margin-bottom: 96px;
`;

export const OrderConfirmationContainer = styled.div`
  max-width: 380px;
  margin: 0 auto;
`;

export const BOGOOfferNoticeWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);

  background: linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

export const BOGOOfferText = styled.p`
  margin: 0;
  text-align: center;
  font-weight: 700;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  letter-spacing: -0.01em;
  line-height: 1.4;

  strong {
    color: #ff446b;
  }
`;

export const BOGOOfferInstruction = styled.p`
  margin: 0;
  text-align: center;
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
  color: #555;

  em {
    font-weight: 600;
    color: #ff6b6b;
    font-style: normal;
  }

  /* span 사이 간격 */
  span + span {
    margin-left: 4px;
  }
`;
