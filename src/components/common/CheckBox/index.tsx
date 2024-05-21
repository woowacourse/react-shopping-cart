import CheckedIcon from "../../../assets/checkedIcon.png";
import UncheckedIcon from "../../../assets/uncheckedIcon.png";

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledLabel,
} from "./style";

interface CheckBoxProps {
  id: string;
  isSelected: boolean;
  toggleSelected: () => void;
  label?: string;
}

export default function CheckBox({
  isSelected,
  toggleSelected,
  label,
  id,
}: CheckBoxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        id={id}
        type="checkbox"
        defaultChecked={isSelected}
        onChange={toggleSelected}
      />

      <StyledCheckbox onClick={toggleSelected} type="button">
        {isSelected ? (
          <img src={CheckedIcon} alt="checked icon" />
        ) : (
          <img src={UncheckedIcon} alt="unchecked icon" />
        )}
      </StyledCheckbox>

      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    </CheckboxContainer>
  );
}
