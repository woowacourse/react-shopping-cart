import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
  from {
    bottom: -50px;
    opacity: 0;
  }
  to {
    bottom: 20px;
    opacity: 1;
  }
`;

const fadeout = keyframes`
  from {
    bottom: 20px;
    opacity: 1;
  }
  to {
    bottom: -50px;
    opacity: 0;
  }
`;

export const SnackbarContainer = styled.div`
  min-width: 10rem;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#333')};
  color: #fff;
  text-align: center;
  border-radius: 0.4rem;
  padding: 25px 50px 25px 50px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
  -webkit-animation: ${fadein} 0.5s, ${fadeout} 0.5s ${({ time }) => (time ? time : '2s')};
  animation: ${fadein} 0.5s, ${fadeout} 0.5s ${({ time }) => (time ? time : '2s')};
`;
