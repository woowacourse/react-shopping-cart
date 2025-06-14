import { ComponentProps, ReactNode } from 'react';

import { StyledHeader } from './Header.styled';

export type HeaderProps = {
  left?: ReactNode;
  right?: ReactNode;
} & ComponentProps<'header'>;

export const Header = ({ left, right, ...props }: HeaderProps) => {
  return (
    <StyledHeader right={right} {...props}>
      {left}
      {right}
    </StyledHeader>
  );
};
