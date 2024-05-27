import styled from "styled-components";

export const StyledCartSummaryItem = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSummaryItemTitle = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;

export const StyledSummaryItemPrice = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: right;
  color: rgba(0, 0, 0, 1);
`;
