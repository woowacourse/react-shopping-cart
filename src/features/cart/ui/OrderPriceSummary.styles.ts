import styled from '@emotion/styled';

export const OrderPriceSummaryContainer = styled.section`
  width: 100%;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  padding-top: 10px;
`;

export const DeliveryFee = styled.div`
  ${baseStyle}
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
`;

export const TotalPurchasePrice = styled.div`
  ${baseStyle}
  padding-top: 10px;
`;

export const PriceBox = styled.span`
  font-size: 24px;
`;
