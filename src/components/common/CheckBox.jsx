import React from "react";
import * as S from "./CheckBox.styled";

function CheckBox({ checked, onClick }) {
  return (
    <S.CheckBoxInput type={"checkbox"} checked={checked} onClick={onClick} />
  );
}

export default CheckBox;
