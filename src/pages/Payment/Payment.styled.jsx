import styled from "styled-components";
import SCREENS from "../../constants/screens";

export const Payment = styled.section``;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;

  & > *:not(:first-child) {
    margin-top: 3rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.SMALL}) {
    padding: 3rem 1.5rem;
  }

  @media (min-width: ${SCREENS.BREAKPOINTS.LARGE}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    column-gap: 3rem;
  }
`;
