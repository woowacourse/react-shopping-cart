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
  isApplicable?: boolean;
}

export default function CheckBox({
  isSelected,
  toggleSelected,
  label,
  id,
  isApplicable = false,
}: CheckBoxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        id={id}
        type="checkbox"
        defaultChecked={isSelected}
        onChange={toggleSelected}
        disabled={!isApplicable}
      />

      <StyledCheckbox
        onClick={isApplicable ? toggleSelected : undefined}
        type="button"
        className={!isApplicable ? "disabled" : ""}
      >
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
