import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px 36px;
  flex-grow: 1;
  height: calc(100vh - 128px);
`;

export const BackIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  flex-grow: 1;
  overflow: hidden;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OrderItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-right: 12px;
  gap: 20px;
  overflow-y: auto;
  flex-grow: 1;
  min-height: 0;
`;

export const CouponButton = styled.button`
  width: 100%;
  min-height: 48px;
  border: 1px solid #33333340;
  border-radius: 5px;
  margin: 32px 0;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  font-weight: 700;
  font-size: 15px;
  color: #333333bf;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    transform: scale(0.995);
    background-color: #ebebeb;
  }
`;

export const ShippingInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ShippingLabel = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

export const ShippingSurchargeContainer = styled.div`
  display: flex;
  gap: 8px;
  line-height: 26px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 32px;
`;

export const PriceSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
`;

export const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #0000001a;
  padding-top: 12px;
`;
