import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeout = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const SnackbarContainer = styled.div`
  min-width: 10rem;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#333')};
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 0.4rem;
  padding: 25px 50px 25px 50px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
  -webkit-animation: ${fadein} 0.2s, ${fadeout} 0.2s ${({ time }) => time || '2s'};
  animation: ${fadein} 0.2s, ${fadeout} 0.2s ${({ time }) => time || '2s'};
`;
