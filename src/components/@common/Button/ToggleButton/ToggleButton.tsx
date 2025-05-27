import { css } from "@emotion/css";

interface ToggleButtonProps {
  isSelected: boolean;
  onClick?: () => void;
}

const ToggleButton = ({ isSelected, onClick }: ToggleButtonProps) => {
  return (
    <button onClick={onClick} className={ToggleButtonStyle(isSelected)}>
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
`;
