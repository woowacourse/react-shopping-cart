import styled from "styled-components";
import { BREAK_POINT } from "../../constants/style";

export const Cart = styled.div``;

export const CartMain = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 3rem 1.5rem;

  @media (max-width: ${BREAK_POINT.DESKTOP}) {
    flex-direction: column;
  }
`;
