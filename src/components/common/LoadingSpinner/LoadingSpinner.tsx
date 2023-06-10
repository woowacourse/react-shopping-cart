import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const LoadingSpinner = () => {
  return (
    <Container>
      <Loader>
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
      </Loader>
    </Container>
  );
};

export default LoadingSpinner;

const spin = keyframes` 
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Container = styled.div`
  width: auto;
  height: auto;
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  animation: ${spin} 0.6s linear infinite reverse;
`;

const Ball = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  animation: ${spin} 1s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    background-color: #333333;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    top: 0;
  }

  &:nth-child(2) {
    animation-delay: -0.1s;
  }
  &:nth-child(3) {
    animation-delay: -0.2s;
  }
  &:nth-child(4) {
    animation-delay: -0.3s;
  }
  &:nth-child(5) {
    animation-delay: -0.4s;
  }
  &:nth-child(6) {
    animation-delay: -0.5s;
  }
  &:nth-child(7) {
    animation-delay: -0.6s;
  }
  &:nth-child(8) {
    animation-delay: -0.7s;
  }
  &:nth-child(9) {
    animation-delay: -0.8s;
  }
  &:nth-child(10) {
    animation-delay: -0.9s;
  }
`;
