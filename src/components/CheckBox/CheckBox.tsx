import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  dataTestId: string;
  disabled?: boolean;
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
