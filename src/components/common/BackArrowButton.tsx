import { ButtonHTMLAttributes } from 'react';

interface BackArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const BackArrowButton = ({ onClick, ...props }: BackArrowButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      <img src={`${import.meta.env.BASE_URL}/assets/icons/BackArrow.svg`} />
    </button>
  );
};
export default BackArrowButton;
