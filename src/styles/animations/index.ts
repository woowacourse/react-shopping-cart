import { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const moveUp = keyframes`
  from {
    transform: translateX(-50%) translateY(50%);
  }
  to {
    transform: translateX(-50%) translateY(0%);
  }    
`;

const skeleton = keyframes`
  0% {
     background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export { fadeIn, fadeOut, moveUp, skeleton };
