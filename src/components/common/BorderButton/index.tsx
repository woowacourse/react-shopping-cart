import { PropsWithChildren } from 'react';
import * as S from './style';

const BorderButton: React.FC<
  PropsWithChildren<{
    onClick: () => void;
    size: S.SizeType;
    className?: string;
  }>
> = ({ children, onClick, size, className }) => {
  return (
    <S.BorderButton className={className} onClick={onClick} size={size}>
      {children}
    </S.BorderButton>
  );
};

export default BorderButton;
