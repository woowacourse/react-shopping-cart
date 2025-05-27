import { Button, disabledButton, enabledButton } from "./SubmitButton.styles";

interface SubmitButtonProps {
  label: string;
  enabled: boolean;
}

function SubmitButton({ label, enabled }: SubmitButtonProps) {
  return (
    <button
      css={[Button, enabled ? enabledButton : disabledButton]}
      type="button"
      disabled={!enabled}
    >
      {label}
    </button>
  );
}

export default SubmitButton;
