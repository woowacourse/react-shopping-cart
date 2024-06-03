/** @jsxImportSource @emotion/react */
import Button from "../Button";

interface CheckboxProps {
  isCheck: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Checkbox = ({ isCheck, isDisabled, onClick }: CheckboxProps) => {
  return (
    <Button width="24px" onClick={onClick} isDisabled={isDisabled} isHighlight={isCheck}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.88425 11.17L1.71425 7L0.29425 8.41L5.88425 14L17.8843 2L16.4743 0.589996L5.88425 11.17Z"
          fill={isCheck ? "white" : "black"}
          fillOpacity={isCheck ? "1" : "0.1"}
        />
      </svg>
    </Button>
  );
};

export default Checkbox;
