import CheckedIcon from "../../../assets/checkedIcon.png";
import UncheckedIcon from "../../../assets/uncheckedIcon.png";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledLabel,
} from "./style";

interface CheckBoxProps {
  isSelected: boolean;
  toggleSelected: () => void;
  label?: string;
}

export default function CheckBox({
  isSelected,
  toggleSelected,
  label,
}: CheckBoxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        defaultChecked={isSelected}
        onChange={toggleSelected}
      />

      <StyledCheckbox onClick={toggleSelected}>
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
