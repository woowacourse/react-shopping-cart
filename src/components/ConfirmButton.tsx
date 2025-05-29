import { ButtonHTMLAttributes } from 'react';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import BottomButton from './BottomButton';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const ConfirmButton = ({ title, ...rest }: ConfirmButtonProps) => {
  const { checkedCartIds } = useCartItemsContext();
  const isDisabled = checkedCartIds.length === 0;

  return <BottomButton disabled={isDisabled} title={title} {...rest} />;
};

export default ConfirmButton;
