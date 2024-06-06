import styled from "styled-components";

export const StyledCartItemCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
`;

export const StyledProductImg = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const StyledProductInfo = styled.div`
  width: 256px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledProductName = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
  margin-bottom: 4px;
`;

export const StyledProductPrice = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  color: rgba(0, 0, 0, 1);
`;

export const StyledProductQuantity = styled.p`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  color: rgba(10, 13, 19, 1);
  margin-top: 24px;
  margin-bottom: 0;
`;
