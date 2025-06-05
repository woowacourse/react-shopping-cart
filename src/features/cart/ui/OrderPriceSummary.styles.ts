import styled from '@emotion/styled';

export const OrderPriceSummaryContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const SuburbExtraFeeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: start;
  align-items: center;
  gap: 10px;
`;

export const DeliveryFeeHeaderLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const DeliveryFeeLabel = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

export const DeliveryFeeIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
`;

const baseStyle = `
  width: 100%;
  font-size:16px;
  font-weight:700;
  display: flex;
  justify-content: space-between;
`;

export const TotalOrderPrice = styled.div`
  ${baseStyle}
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
`;

export const CouponDiscountAmount = styled.div`
  ${baseStyle}
`;

export const DeliveryFee = styled.div`
  ${baseStyle}
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 12px;
`;

export const TotalPurchasePrice = styled.div`
  ${baseStyle}
`;

export const PriceBox = styled.span`
  font-size: 24px;
`;
