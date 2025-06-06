import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  dataTestId: string;
}

export function CheckBox({
  isChecked = false,
  id,
  handleCheckBox,
  dataTestId,
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      css={CheckBoxLayout}
      id={id}
      checked={isChecked}
      onChange={handleCheckBox}
      data-testid={dataTestId}
    />
  );
}
