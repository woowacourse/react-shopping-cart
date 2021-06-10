import styled from "styled-components";
import { MEDIA_QUERY, COLOR } from "../../../constants/style";

export const OrdersListItem = styled.li`
  margin-bottom: 4.5rem;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.25rem;
  background-color: ${COLOR.GRAY_200};
  border: 1px solid ${COLOR.GRAY_600};

  @media (max-width: ${MEDIA_QUERY.MOBILE}) {
    padding: 1rem;
    font-size: 1rem;
  }
`;
