import styled from 'styled-components';

export const Page = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-top: 2rem;
  flex-wrap: wrap;
  padding: 1rem;

  & > .first {
    flex-basis: 70%;
    padding-right: 4rem;
  }

  & > .second {
    flex-basis: 30%;
  }

  .controller {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        margin-left: 0.6rem;
      }
    }
  }

  .legacy {
    border-bottom: 2px solid black;
    padding: 1rem 0;
  }
`;
