import { ButtonHTMLAttributes } from 'react';
import BottomButton from './BottomButton';
import { useCheckCartIdsContext } from '../../contexts/CheckedCartIds/CheckedCartIdsContext';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const ConfirmButton = ({ title, ...rest }: ConfirmButtonProps) => {
  const { checkedCartIds } = useCheckCartIdsContext();
  const isDisabled = checkedCartIds.length === 0;

  return <BottomButton disabled={isDisabled} title={title} {...rest} />;
};

export default ConfirmButton;
