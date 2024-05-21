import BorderButton from './BorderButton';
import Minus from '@/assets/Minus.svg?react';
import Plus from '@/assets/Plus.svg?react';

interface Props {
  onClick: () => void;
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <Plus />
    </BorderButton>
  );
};

export const MinusButton = ({ onClick }: Props) => {
  return (
    <BorderButton onClick={onClick}>
      <Minus />
    </BorderButton>
  );
};
