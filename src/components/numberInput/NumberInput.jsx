import React from 'react';
import styled from 'styled-components';
import upArrow from '../../assets/upArrow.svg';
import downArrow from '../../assets/downArrow.svg';
import { COLOR } from '../../constants/color';

const StyledNumberInputContainer = styled.div`
  position: relative;
  left: -42px;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number']:disabled {
    background-color: ${COLOR.WHITE};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const StyledNumberInput = styled.input.attrs({ type: 'number' })`
  font-size: 24px;
  width: 72px;
  height: 60px;
  line-height: 1.5;
  float: left;
  display: block;
  padding: 0;
  margin: 0;
  border: 1px solid ${COLOR.GRAY_200};
  text-align: center;

  &:focus {
    outline: 0;
  }
`;

const StyledArrowContainer = styled.div`
  float: left;
  position: relative;
  height: 60px;
`;

const StyledButton = styled.div`
  position: relative;
  cursor: pointer;
  width: 42px;
  text-align: center;
  line-height: 1.5;
  user-select: none;
  border-color: ${COLOR.GRAY_200};
  border-style: solid;
  border-width: 0;
`;

const StyledUpArrow = styled(StyledButton)`
  position: absolute;
  height: 50%;
  top: 0;
  border-width: 1px 1px 0 0;
`;

const StyledDownArrow = styled(StyledButton)`
  position: absolute;
  bottom: 0;
  height: 50%;
  border-width: 1px 1px 1px 0;
`;

const NumberInput = () => (
  <StyledNumberInputContainer>
    <StyledNumberInput min="1" disabled />
    <StyledArrowContainer>
      <StyledUpArrow>
        <img src={upArrow} alt="증가" />
      </StyledUpArrow>
      <StyledDownArrow>
        <img src={downArrow} alt="감소" />
      </StyledDownArrow>
    </StyledArrowContainer>
  </StyledNumberInputContainer>
);

export default NumberInput;
