import Button from "../Button/Button";
import {
  Button as baseStyle,
  enabledButton,
  disabledButton,
} from "./SubmitButton.styles";

interface SubmitButtonProps {
  label: string;
  enabled: boolean;
  onClick?: () => void;
}

function SubmitButton({ label, enabled, onClick }: SubmitButtonProps) {
  const combinedStyle = [baseStyle, enabled ? enabledButton : disabledButton];

  return (
    <Button cssStyle={combinedStyle} disabled={!enabled} onClick={onClick}>
      {label}
    </Button>
  );
}

export default SubmitButton;
