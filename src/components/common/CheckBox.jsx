import React, { useState } from "react";
import styled from "styled-components";

const CheckBoxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
`;

const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CheckIcon = styled.div`
  display: inline-block;
  transform: rotate(45deg);
  height: 18px;
  width: 12px;
  border-bottom: 4px solid ${({ theme: { color } }) => color.main};
  border-right: 4px solid ${({ theme: { color } }) => color.main};
`;

const CustomCheckBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;

  box-shadow: 0 0 0 1px ${({ theme: { color } }) => color.point};
  border-radius: 2px;
  text-align: center;

  ${CheckBoxInput}:checked + & {
    background-color: ${({ theme: { color } }) => color.point};
  }

  ${CheckIcon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

function CheckBox({ children }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClickCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CheckBoxContainer>
      <CheckBoxInput
        type="checkbox"
        checked={isChecked}
        onClick={handleClickCheckbox}
      />
      <CustomCheckBox checked={isChecked}>
        <CheckIcon />
      </CustomCheckBox>
      {children}
    </CheckBoxContainer>
  );
}

export default CheckBox;
