import { Button, disabledButton, enabledButton } from "./SubmitButton.styles";

interface SubmitButtonProps {
  label: string;
  enabled: boolean;
  onClick?: () => void;
}

function SubmitButton({ label, enabled, onClick }: SubmitButtonProps) {
  return (
    <button
      css={[Button, enabled ? enabledButton : disabledButton]}
      type="button"
      disabled={!enabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
