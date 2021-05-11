import styled from "styled-components";
import { BREAK_POINT } from "../../constants/style";

export const Payment = styled.section``;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 1.5rem;

  @media (max-width: ${BREAK_POINT.DESKTOP}) {
    flex-direction: column;
  }
`;
