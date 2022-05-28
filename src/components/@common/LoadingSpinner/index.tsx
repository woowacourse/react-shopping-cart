import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <Styled.Container>
      <Styled.LoadingSpinner />
    </Styled.Container>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }  
`;

const Styled = {
  Container: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  LoadingSpinner: styled.div`
    width: 100px;
    height: 100px;
    border: 15px solid powderblue;
    border-top-color: rgb(71, 181, 196);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  `,
};

export default LoadingSpinner;
