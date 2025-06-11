import React from "react";
import * as S from "./CheckBox.styles";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function CheckBox(props: CheckBoxProps) {
  return <S.Checkbox {...props} />;
}
