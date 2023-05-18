import styled from 'styled-components';

export const Main = styled.main`
  display: grid;
  grid-template-columns: 60% 40%;

  & > * {
    margin: 0 auto;
  }

  & > *:first-child {
    margin-top: 2%;
    width: 100%;
  }

  & > *:last-child {
    margin: 10% auto;
  }
`;
