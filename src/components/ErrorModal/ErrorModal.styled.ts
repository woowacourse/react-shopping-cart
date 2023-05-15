import styled from 'styled-components';

export const StyledErrorModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;
`;

export const StyledBackdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;

  background-color: black;
  opacity: 0.6;
`;

export const StyledContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 60%;

  border-radius: 8px;

  background-color: white;

  @media screen and (max-width: 950px) {
    width: 80%;
  }

  @media screen and (max-width: 650px) {
    width: 80%;
  }
`;
