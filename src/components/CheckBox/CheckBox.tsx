import { Button, Container, Label } from "./\bCheckBox.styles";

interface CheckBoxProps {
  label?: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

function CheckBox({ label, id, isSelected, onClick }: CheckBoxProps) {
  const imageSource = isSelected
    ? "/public/enabledCheck.svg"
    : "/public/disabledCheck.svg";

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
