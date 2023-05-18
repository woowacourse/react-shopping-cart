import React from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';

const LoadingPage: React.FC = () => {
  return (
    <>
      <StyleLoadingMessage>보유 카드 페이지 로딩중입니다.</StyleLoadingMessage>
      <StyledSpinnerWrapper>
        <Spinner />
      </StyledSpinnerWrapper>
    </>
  );
};

const StyleLoadingMessage = styled.div`
  width: 100%;
  height: 200px;

  text-align: center;

  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledSpinnerWrapper = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default LoadingPage;
