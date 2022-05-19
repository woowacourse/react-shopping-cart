import styled from "styled-components";
import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";

export const OrderContainer = styled(RowFlexWrapper)`
  justify-content: flex-start;
  width: 490px;
  padding: 20px 5px;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors["gray_03"]};
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderItemInfoContainer = styled(ColumnFlexWrapper)`
  align-items: flex-start;
  justify-content: flex-start;
`;
