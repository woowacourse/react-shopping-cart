import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

export default styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-bottom: ${({ mb }) => mb || ''};
  margin-top: ${({ mt }) => mt || ''};
  margin-left: ${({ ml }) => ml || ''};
  margin-right: ${({ mr }) => mr || ''};
  border-radius: 5px;
  background-image: linear-gradient(90deg, #e0e0e0 0px, #ededed 30px, #e0e0e0 60px);
  animation: ${pulse} 1s infinite ease-out;
`;
