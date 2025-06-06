import { css } from "@emotion/css";

interface CheckBoxProps {
  isSelected: boolean;
  onClick?: () => void;
  testId?: string;
}

const CheckBox = ({ isSelected, onClick, testId }: CheckBoxProps) => {
  return (
    <button
      onClick={onClick}
      className={CheckBoxStyle(isSelected)}
      data-testid={testId}
    >
      <img src={isSelected ? "./checked-icon.svg" : "./unchecked-icon.svg"} />
    </button>
  );
};

export default CheckBox;

const CheckBoxStyle = (isSelected: boolean) => css`
  width: 24px;
  height: 24px;
  background-color: ${isSelected ? "#000000" : "#ffffff"};
  border: ${isSelected ? "1px solid #000000" : "1px solid #E5E5E5"};
  cursor: pointer;
  justify-content: center;
  border-radius: 8px;
  display: flex;
`;
