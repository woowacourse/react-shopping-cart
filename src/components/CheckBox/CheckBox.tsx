import { DisabledCheck, EnabledCheck } from "../../constants/images";
import { BigText, Button, Container, SmallText } from "./\bCheckBox.styles";

interface CheckBoxProps {
  label?: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
  textSize?: "small" | "big";
}

function CheckBox({
  label,
  id,
  isSelected,
  onClick,
  textSize = "small",
}: CheckBoxProps) {
  const imageSource = isSelected ? EnabledCheck : DisabledCheck;

  return (
    <div css={Container}>
      <button css={Button} id={id} type="button" onClick={onClick}>
        <img src={imageSource} alt="체크 박스" />
      </button>
      {label && (
        <label css={textSize === "big" ? BigText : SmallText} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}

export default CheckBox;
