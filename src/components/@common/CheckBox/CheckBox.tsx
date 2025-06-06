import { css } from "@emotion/css";

interface CheckboxProps {
  isSelected: boolean;
  onClick?: () => void;
  testId?: string;
}

const Checkbox = ({ isSelected, onClick, testId }: CheckboxProps) => {
  return (
    <button
      onClick={onClick}
      className={CheckboxStyle(isSelected)}
      data-testid={testId}
    >
      <img src={isSelected ? "./checked-icon.svg" : "./unchecked-icon.svg"} />
    </button>
  );
};

export default Checkbox;

const CheckboxStyle = (isSelected: boolean) => css`
  width: 24px;
  height: 24px;
  background-color: ${isSelected ? "#000000" : "#ffffff"};
  border: ${isSelected ? "1px solid #000000" : "1px solid #E5E5E5"};
  cursor: pointer;
  justify-content: center;
  border-radius: 8px;
  display: flex;
`;
