import styled from "styled-components";

export const StyledConfirmationPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

export const StyledConfirmationPageTitle = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;

export const StyledConfirmationPageDescription = styled.span`
  display: flex;
  flex-direction: column;

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  color: rgba(10, 13, 19, 1);
  gap: 0px;
`;

export const StyledConfirmationPagePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledConfirmationPageSubTitle = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  color: rgba(10, 13, 19, 1);
`;

export const StyledConfirmationPagePrice = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;
