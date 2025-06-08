import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
}

export function CheckBox({
  isChecked = false,
  id,
  handleCheckBox,
  dataTestId,
  disabled = false,
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      css={CheckBoxLayout}
      id={id}
      checked={isChecked}
      onChange={handleCheckBox}
      data-testid={dataTestId}
      disabled={disabled}
    />
  );
}
