import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (id: string) => void;
  id: string;
}

export function CheckBox({ isChecked = false, id, onChange }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      css={CheckBoxLayout}
      id={id}
      checked={isChecked}
      onChange={() => onChange(id)}
    />
  );
}
