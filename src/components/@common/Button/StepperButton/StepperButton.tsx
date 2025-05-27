import { css } from "@emotion/css";

interface StepperButtonProps {
  type: "increase" | "decrease";
  onClick: () => void;
}

const StepperButton = ({ type, onClick }: StepperButtonProps) => {
  return (
    <button onClick={onClick} className={StepperButtonStyle}>
      {type === "decrease" ? (
        <img src="./decrease.svg" />
      ) : (
        <img src="./increase.svg" />
      )}
    </button>
  );
};

export default StepperButton;

const StepperButtonStyle = css`
  background-color: #ffffff;
`;
