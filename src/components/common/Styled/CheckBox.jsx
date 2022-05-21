import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = {
  CheckInput: styled.input`
    border: 1px solid red;
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
    display: block;
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

const CheckBox = ({ id, isChecked }) => {
  return (
    <div>
      <Styled.CheckInput type="checkbox" id={`product-check-${id}`} checked={isChecked} readOnly />
      <Styled.CheckLabel htmlFor={`product-check-${id}`}>
        <span>✔︎</span>
      </Styled.CheckLabel>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  onToggleCheckClick: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default CheckBox;
