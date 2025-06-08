import * as Styled from "./CheckBox.style";
import unChecked from "/unChecked.svg";
import checked from "/checked.svg";

interface CheckBoxProps {
  isChecked: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

function CheckBox({ isChecked, isDisabled, onClick }: CheckBoxProps) {
  return (
    <Styled.Button
      onClick={onClick}
      type="button"
      aria-label={isChecked ? "선택 해제" : "선택"}
      disabled={isDisabled}
    >
      <Styled.Icon
        src={isChecked ? checked : unChecked}
        alt={isChecked ? "선택됨" : "선택 안 됨"}
      />
    </Styled.Button>
  );
}

export default CheckBox;
