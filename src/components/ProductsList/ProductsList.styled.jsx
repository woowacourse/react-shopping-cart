import styled from "styled-components";
import { BREAK_POINT } from "../../constants/style";

export const ProductsList = styled.section`
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(14.5rem, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  @media (max-width: ${BREAK_POINT.DESKTOP}) {
    grid-template-columns: repeat(3, minmax(14.5rem, 1fr));
  }

  @media (max-width: ${BREAK_POINT.TABLET}) {
    grid-template-columns: repeat(2, minmax(14.5rem, 1fr));
  }

  @media (max-width: ${BREAK_POINT.MOBILE}) {
    grid-template-columns: repeat(1, minmax(14.5rem, 1fr));
  }
`;
