import { SerializedStyles } from '@emotion/react';
import { CheckBoxLayout } from './CheckBox.style';

interface CheckBoxProps {
  isChecked: boolean;
  onChange: (id: string) => void;
  id: string;
  dataTestId: string;
  customCss?: SerializedStyles;
}

export function CheckBox({
  isChecked = false,
  id,
  onChange,
  dataTestId,
  customCss,
}: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      css={[CheckBoxLayout, customCss]}
      id={id}
      checked={isChecked}
      onChange={() => onChange(id)}
      data-testid={dataTestId}
    />
  );
}
