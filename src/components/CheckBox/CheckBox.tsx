import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  dataTestId: string;
}

export function CheckBox({
  checked = false,
  id,
  onChange,
  dataTestId,
  disabled = false,
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      css={CheckBoxLayout}
      id={id}
      checked={checked}
      onChange={onChange}
      data-testid={dataTestId}
      disabled={disabled}
    />
  );
}
