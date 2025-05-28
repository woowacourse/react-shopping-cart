import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
}

export function CheckBox({ isChecked = false }: CheckBoxProps) {
  return <input type="checkbox" css={CheckBoxLayout} />;
}
