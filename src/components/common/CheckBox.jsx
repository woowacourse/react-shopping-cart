import React from "react";
import { StyledCheckBoxInput } from "./CheckBox.styled";

function CheckBox({ checked, onClick }) {
  return (
    <StyledCheckBoxInput
      type={"checkbox"}
      checked={checked}
      onClick={onClick}
    />
  );
}

export default CheckBox;
