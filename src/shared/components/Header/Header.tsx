import { ComponentProps, ReactNode } from 'react';

import { StyledHeader } from '@/shared/components/Header/Header.styled';

export type HeaderProps = {
  left: ReactNode;
  right?: ReactNode;
  justifyContent?: string;
} & ComponentProps<'header'>;

export const Header = ({ left, right, ...props }: HeaderProps) => {
  const justifyContent = right ? 'space-between' : 'flex-start';
  return (
    <StyledHeader justifyContent={justifyContent} {...props}>
      {left}
      {right}
    </StyledHeader>
  );
};
