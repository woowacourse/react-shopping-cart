import styled from "styled-components";
import SCREENS from "../../constants/screens";

export const ProductsList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(9.5rem, 1fr));
  column-gap: 2rem;
  row-gap: 2rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    padding: 1rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.MEDIUM}) {
    grid-template-columns: repeat(3, minmax(11.5rem, 1fr));
    padding: 2rem;
    column-gap: 3rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.LARGE}) {
    grid-template-columns: repeat(4, minmax(12.5rem, 1fr));
  }
`;
