import { ButtonHTMLAttributes } from 'react';
import { CART } from '../../assets';

const StepperEntryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onClick } = props;

  return (
    <button onClick={onClick}>
      <CART />
    </button>
  );
};

export default StepperEntryButton;
