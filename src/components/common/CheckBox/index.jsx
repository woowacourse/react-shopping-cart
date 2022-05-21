import React from "react";
import {
  CheckBoxContainer,
  CheckBoxInput,
  CheckIcon,
  CustomCheckBox,
} from "./styled";

function CheckBox({ children, isChecked, handleChangeCheckbox }) {
  return (
    <CheckBoxContainer>
      <CheckBoxInput
        type="checkbox"
        checked={isChecked}
        onChange={handleChangeCheckbox}
      />
      <CustomCheckBox checked={isChecked}>
        <CheckIcon />
      </CustomCheckBox>
      {children}
    </CheckBoxContainer>
  );
}

export default CheckBox;
