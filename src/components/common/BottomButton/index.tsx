import { PropsWithChildren } from 'react';
import * as S from './styles';

export type BottomButtonProps = PropsWithChildren<{
  onClick: () => void;
  active: boolean;
}>;

export default function BottomButton({
  children,
  onClick,
  active,
}: BottomButtonProps) {
  const handleClick = () => {
    if (active) {
      onClick();
    }
  };

  return (
    <S.Button onClick={handleClick} active>
      {children}
    </S.Button>
  );
}
