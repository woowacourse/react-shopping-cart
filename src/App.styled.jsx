import styled from "styled-components";
import SCREENS from "./constants/screens";

export const App = styled.div``;
export const Main = styled.main`
  max-width: ${SCREENS.BREAKPOINTS.LARGE};
  margin: 0 auto;
  padding: 2rem 1rem;
  margin-top: 5rem;

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    padding: 2rem 0;
  }
`;
