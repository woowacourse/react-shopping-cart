import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% {
    transform: rotate(0);
  }
  33% {
    transform: rotate(120deg);
  }
  67% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid ${(props) => props.theme.color.secondary};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  animation: ${rotation} 1.5s linear infinite;
`;
