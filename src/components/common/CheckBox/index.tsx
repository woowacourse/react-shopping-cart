import CheckedIcon from '../../../assets/checkedIcon.png';
import UncheckedIcon from '../../../assets/uncheckedIcon.png';

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledLabel,
} from './style';

interface CheckBoxProps {
  label?: string | React.ReactNode;
  isSelected: boolean;
  toggleSelected: () => void;
  disabled?: boolean;
}

export default function CheckBox({
  label,
  isSelected,
  toggleSelected,
  disabled,
}: CheckBoxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        defaultChecked={isSelected}
        disabled={disabled}
        onChange={toggleSelected}
      />

      <StyledCheckbox onClick={toggleSelected} disabled={disabled}>
        {isSelected ? (
          <img src={CheckedIcon} alt="checked icon" />
        ) : (
          <img src={UncheckedIcon} alt="unchecked icon" />
        )}
      </StyledCheckbox>

      {label && <StyledLabel>{label}</StyledLabel>}
    </CheckboxContainer>
  );
}
