import { ReactNode } from 'react';
import * as S from './Header.styled';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <S.Header>{children}</S.Header>;
}
