import { css } from "@emotion/css";

interface StepperButtonProps {
  testId: string;
  type: "increase" | "decrease";
  onClick: () => void;
}

const StepperButton = ({ testId, type, onClick }: StepperButtonProps) => {
  return (
    <button
      data-testid={testId}
      onClick={onClick}
      className={StepperButtonStyle}
    >
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
