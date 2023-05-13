import styled from 'styled-components';

export const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const StyledErrorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;
  padding: 20px;

  border-radius: 8px;

  & > h1 {
    font-size: xx-large;
  }

  & > p {
    font-size: larger;
  }
`;

export const StyledHomeEntryButton = styled.button`
  padding: 20px;

  color: white;
  background-color: #04c09e;

  border-radius: 8px;

  font-size: larger;

  cursor: pointer;
`;
