import styled from "styled-components";
import { MEDIA_QUERY } from "../../constants/style";

export const Payment = styled.section``;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3rem 1.5rem;

  @media (max-width: ${MEDIA_QUERY.DESKTOP}) {
    flex-direction: column;
  }
`;
