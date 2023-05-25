import styled from 'styled-components';

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  main {
    height: 100%;

    padding: 52px 160px;

    overflow: auto;

    @media screen and (max-width: 1000px) {
      padding: 52px 40px;
    }
  }

  section {
    height: 100%;
  }
`;
