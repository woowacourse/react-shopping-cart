import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
  id?: string;
}

export function CheckBox({ isChecked = false, id }: CheckBoxProps) {
  return <input type="checkbox" css={CheckBoxLayout} id={id} />;
}
