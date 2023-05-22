import styled, { keyframes } from 'styled-components';

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

export const DotWrapper = styled.div`
  position: absolute;
  top: 40%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 2rem;
`;

export const Dot = styled.div<{ delay: string }>`
  background-color: black;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;

  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
