import styled from "styled-components";
import { BREAK_POINT, COLOR } from "../../../constants/style";

export const OrdersListItem = styled.li`
  margin-bottom: 4.5rem;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.25rem;
  background-color: ${COLOR.GRAY[200]};
  border: 1px solid ${COLOR.GRAY[600]};

  @media (max-width: ${BREAK_POINT.MOBILE}) {
    padding: 1rem;
    font-size: 1rem;
  }
`;
