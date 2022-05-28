import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;

  .body {
    width: 100%;
    height: calc(100% - 70px);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    grid-gap: 30px;
    padding: 60px;
    overflow-y: auto;
  }

  .footer {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
