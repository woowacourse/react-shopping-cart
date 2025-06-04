import { CheckBoxLayout } from "./CheckBox.style";

interface CheckBoxProps {
  isChecked: boolean;
  handleCheckBox: (id: string) => void;
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
      onChange={() => handleCheckBox(id)}
      data-testid={dataTestId}
    />
  );
}
