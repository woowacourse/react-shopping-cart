import { DisabledCheck, EnabledCheck } from "../../constants/images";
import { Button, Container, Label } from "./\bCheckBox.styles";

interface CheckBoxProps {
  label?: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

function CheckBox({ label, id, isSelected, onClick }: CheckBoxProps) {
  const imageSource = isSelected ? EnabledCheck : DisabledCheck;

  return (
    <div css={Container}>
      <button css={Button} id={id} type="button" onClick={onClick}>
        <img src={imageSource} alt="체크 박스" />
      </button>
      {label && (
        <label css={Label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}

export default CheckBox;
