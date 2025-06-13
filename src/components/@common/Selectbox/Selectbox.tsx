import { css } from "@emotion/css";

interface SelectboxProps {
  isSelected: boolean;
  onClick?: () => void;
  testId?: string;
}

const Selectbox = ({ isSelected, onClick, testId }: SelectboxProps) => {
  return (
    <button
      onClick={onClick}
      className={SelectboxStyle(isSelected)}
      data-testid={testId}
    >
      <img src={isSelected ? "./checked-icon.svg" : "./unchecked-icon.svg"} />
    </button>
  );
};

export default Selectbox;

const SelectboxStyle = (isSelected: boolean) => css`
  width: 24px;
  height: 24px;
  background-color: ${isSelected ? "#000000" : "#ffffff"};
  border: ${isSelected ? "1px solid #000000" : "1px solid #E5E5E5"};
  cursor: pointer;
  justify-content: center;
  border-radius: 8px;
  display: flex;
`;
