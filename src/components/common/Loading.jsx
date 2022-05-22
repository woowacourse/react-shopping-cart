import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <StyledLoadingLayout>
      <StyledSpinner />
    </StyledLoadingLayout>
  );
}

const StyledLoadingLayout = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
`;

const StyledSpinner = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f1f1f9;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border: 5px solid black;
  border-bottom-color: transparent;
  position: relative;
  animation: spinner 1s linear infinite paused;
  -webkit-animation: spinner 1s linear infinite;

  @keyframes spinner {
    to {
      transform: rotate(1turn);
      -webkit-transform: rotate(1turn);
      -moz-transform: rotate(1turn);
      -ms-transform: rotate(1turn);
      -o-transform: rotate(1turn);
    }
  }
`;

export default Loading;
