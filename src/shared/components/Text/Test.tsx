import { ComponentProps, ReactNode } from 'react';

import { StyledTextContainer } from './Text.styled';

export type Props = {
  type: 'Heading' | 'Title' | 'Body' | 'Caption';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  children: ReactNode;
} & ComponentProps<'p'>;

export const Text = ({ type, weight = 'medium', color = 'black', children, ...props }: Props) => {
  return (
    <StyledTextContainer type={type} weight={weight} color={color} {...props}>
      {children}
    </StyledTextContainer>
  );
};
