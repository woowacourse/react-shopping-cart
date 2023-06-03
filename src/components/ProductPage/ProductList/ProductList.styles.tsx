import styled, { keyframes } from 'styled-components';

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28.3rem, 1fr));
  grid-gap: 4.7rem;
`;

const skeletonAnimation = keyframes`
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

export const SkeletonItem = styled.div`
  width: 30rem;
  height: 35rem;

  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
  background-size: 400%;
  animation: ${skeletonAnimation} 5s infinite ease-out;
`;
