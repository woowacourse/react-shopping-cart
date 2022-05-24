import React from "react";
import {
  CheckBoxContainer,
  CheckBoxInput,
  CheckIcon,
  CustomCheckBox,
} from "./styled";

function CheckBox({ children, isChecked, handleChangeCheckbox, disabled }) {
  return (
    <CheckBoxContainer disabled={disabled}>
      <CheckBoxInput
        type="checkbox"
        checked={isChecked}
        onChange={handleChangeCheckbox}
        disabled={disabled}
      />
      <CustomCheckBox checked={isChecked}>
        <CheckIcon />
      </CustomCheckBox>
      {children}
    </CheckBoxContainer>
  );
}

export default CheckBox;
