import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

interface CheckBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
  onToggle: () => void;
}

const CheckBox = ({ isChecked, onToggle, ...props }: CheckBoxProps) => {
  return (
    <CheckButton isChecked={isChecked} onClick={onToggle} {...props}>
      <svg
        width="12"
        height="10"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.88428 11.17L1.71428 7L0.294281 8.41L5.88428 14L17.8843 2L16.4743 0.589996L5.88428 11.17Z"
          fill={isChecked ? "#ffffff" : "#BDBDBD"}
        />
      </svg>
    </CheckButton>
  );
};

export default CheckBox;

const CheckButton = styled.button<{ isChecked: boolean }>`
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isChecked }) => (isChecked ? "black" : "white")};
  border: ${({ isChecked }) =>
    isChecked ? "black solid 1px" : "#BDBDBD solid 1px"};
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border: ${({ isChecked }) =>
      isChecked ? "black solid 1px" : "#BDBDBD solid 1px"};
  }
`;
