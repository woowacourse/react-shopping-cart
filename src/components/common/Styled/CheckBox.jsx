import React from 'react';
import styled from 'styled-components';

const Styled = {
  CheckInput: styled.input`
    width: 28px;
    height: 28px;
    display: none;
    &:checked + label {
      background: #22a6a2;
      & > span {
        display: block;
      }
    }
  `,
  CheckLabel: styled.label`
    width: 28px;
    height: 28px;
    margin-top: 20px;
    border: 1px solid #22a6a2;
    background: transparent;
    color: #fff;
    text-align: center;
    font-size: 22px;

    & > span {
      display: none;
    }
  `,
};

const CheckBox = () => {
  return (
    <>
      <Styled.CheckInput type="checkbox" id="product-check" />
      <Styled.CheckLabel for="product-check">
        <span>✔︎</span>
      </Styled.CheckLabel>
    </>
  );
};
export default CheckBox;
