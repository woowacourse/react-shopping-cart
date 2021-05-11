import styled from "styled-components";
import { COLOR } from "../../../constants/style";

export const OrdersListItem = styled.li`
  margin-bottom: 4.5rem;
`;

export const Title = styled.div`
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.25rem;
  background-color: ${COLOR.GRAY.LIGHT_400};
  border: 1px solid ${COLOR.GRAY.LIGHT_100};
`;
