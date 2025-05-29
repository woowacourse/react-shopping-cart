import { ButtonHTMLAttributes } from "react";

interface BackArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const BackArrowButton = ({ onClick, ...props }: BackArrowButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      <img src="./assets/icons/BackArrow.svg" />
    </button>
  );
};
export default BackArrowButton;
