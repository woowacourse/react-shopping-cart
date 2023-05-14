import styled from 'styled-components';

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  & > main {
    height: calc(100% - 80px);

    padding: 40px 0;

    overflow: auto;
  }
`;
