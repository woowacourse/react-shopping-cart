import React from 'react';
import styled, { css } from 'styled-components';
import upperIcon from '../asset/up-icon.png';
import downIcon from '../asset/down-icon.png';
import IconButton from './utils/IconButton';

const CounterButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 114px;
  height: 60px;
  margin: 25px 0;
`;

const CounterScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 71px;
  height: 58px;
  border: 1px solid #dddddd;
  font-size: 24px;
`;

const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-left: none;
`;

const CounterButton = ({ count = '1', onIncreaseButtonClick, onDecreaseButtonClick }) => {
  return (
    <CounterButtonWrapper>
      <CounterScreen>{count}</CounterScreen>

      <IconButtonWrapper>
        <IconButton
          src={upperIcon}
          alt="카운터 증가 버튼"
          width="40px"
          height="30px"
          css={IconButtonStyle}
          onClick={onIncreaseButtonClick}
        />
        <IconButton
          src={downIcon}
          alt="카운터 감소 버튼"
          width="40px"
          height="30px"
          css={IconButtonStyle}
          onClick={onDecreaseButtonClick}
        />
      </IconButtonWrapper>
    </CounterButtonWrapper>
  );
};

export default CounterButton;
