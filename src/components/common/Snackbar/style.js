import styled, { keyframes } from 'styled-components';
import PALETTE from '../../../constants/palette';

const fadein = keyframes`
  from {
    bottom: -50px;
    opacity: 0;
  }
  to {
    bottom: 10px;
    opacity: 1;
  }
`;

const fadeout = keyframes`
  from {
    bottom: 10px;
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
  border-radius: 0.5rem;
  padding: 16px 30px 16px 30px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  -webkit-animation: ${fadein} 0.5s, ${fadeout} 0.5s ${({ time }) => (time ? time : '3s')};
  animation: ${fadein} 0.5s, ${fadeout} 0.5s ${({ time }) => (time ? time : '3s')};
`;
