import { ButtonHTMLAttributes } from 'react';

interface BottomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const BottomButton = ({ title, ...rest }: BottomButtonProps) => {
  return <button {...rest}>{title}</button>;
};

export default BottomButton;
