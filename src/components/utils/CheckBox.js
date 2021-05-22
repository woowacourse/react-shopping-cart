import React from 'react';
import checkbox from '../../asset/checkbox.svg';

import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  left: -3000%;

  &:checked + Label:before {
    background-color: #22a6a2;
  }

  &:checked + Label:after {
    background-size: 26px;
  }
`;

const Label = styled.label`
  font-size: 16px;

  &:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 8px;
    width: 28px;
    height: 28px;
    border: 1px solid #22a6a2;
    border-radius: 2px;
    margin: 0 15px 0 0;
  }

  &:after {
    position: absolute;
    top: 8px;
    left: 1px;
    width: 28px;
    height: 28px;
    background: url(${checkbox});
    background-size: 0;
    background-repeat: no-repeat;
    background-position: center;
    content: '';
  }

  &:hover {
    cursor: pointer;
  }
`;

function CheckBox({ labelName, id, checked, onChange }) {
  return (
    <CheckboxWrapper>
      <Input type="checkbox" id={id} checked={checked} onChange={() => onChange(id)} />
      <Label htmlFor={id}>{labelName}</Label>
    </CheckboxWrapper>
  );
}

export default CheckBox;
