import styled from 'styled-components';

export const StyledDeliveryInfo = styled.div`
  display: flex;
  justify-content: start;
  gap: 4px;
  margin-bottom: 12px;
  width: 100%;
`;

export const StyledDeliveryInfoImg = styled.img`
  width: 16px;
  height: 16px;
`;

export const StyledDeliveryInfoText = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;

export const StyledSummaryTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const StyledSummaryDetailPrice = styled.div`
  width: 100%;
  height: 116px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const StyledSummaryTotalPrice = styled.div`
  width: 100%;
  height: 54px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
`;
