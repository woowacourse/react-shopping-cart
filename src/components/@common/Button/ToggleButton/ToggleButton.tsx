import { css } from "@emotion/css";

interface ToggleButtonProps {
  isSelected: boolean;
  onClick?: () => void;
  testId?: string;
  disabled?: boolean;
}

const ToggleButton = ({
  isSelected,
  onClick,
  testId,
  disabled = false,
}: ToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={ToggleButtonStyle(isSelected)}
      data-testid={testId}
      aria-pressed={isSelected}
      disabled={disabled}
    >
      <img src={isSelected ? "./checked-icon.svg" : "./unchecked-icon.svg"} />
    </button>
  );
};

export default ToggleButton;

const ToggleButtonStyle = (isSelected: boolean) => css`
  width: 24px;
  height: 24px;
  background-color: ${isSelected ? "#000000" : "#ffffff"};
  border: ${isSelected ? "1px solid #000000" : "1px solid #E5E5E5"};
  cursor: pointer;
  justify-content: center;
  border-radius: 8px;
  display: flex;
  &:disabled {
    color: #e5e5e5;
    cursor: not-allowed;
  }
`;
