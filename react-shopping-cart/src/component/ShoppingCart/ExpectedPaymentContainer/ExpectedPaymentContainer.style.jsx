import styled from "styled-components";
import { ColumnFlexWrapper } from "styles/Wrapper";

export const ExpectedPaymentTopContainer = styled.div`
  padding: 20px;
  font-size: 16px;
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme }) => theme.colors["gray_04"]};
`;

export const ExpectedPaymentBottomContainer = styled(ColumnFlexWrapper)`
  gap: 42px;
  padding: 20px;
  width: 100%;
`;

export const ExpectedPaymentWrapper = styled.div`
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors["gray_04"]};
`;
