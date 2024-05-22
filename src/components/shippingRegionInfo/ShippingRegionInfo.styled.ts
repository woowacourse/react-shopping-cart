import styled from "styled-components";

export const StyledShippingRegionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  height: 56px;
`;

export const StyledShippingRegionInfoTitle = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;

export const StyledCheckShippingRegionCondition = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const StyledCheckShippingRegionDescription = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;
