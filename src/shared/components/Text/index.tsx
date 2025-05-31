import { ComponentProps, ReactNode } from 'react';

import { StyledTextContainer } from './Text.styled';

export type Props = {
  /**
   * Sets the text variant.
   */
  type: 'Heading' | 'Title' | 'Body' | 'Caption';
  /**
   * Sets the font weight.
   * @default medium
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /**
   * Sets the text color.
   * @default black
   */
  color?: string;
  /**
   * Sets the text content.
   */
  children: ReactNode;
} & ComponentProps<'p'>;

export const Text = ({ type, weight = 'medium', color = 'black', children, ...props }: Props) => {
  return (
    <StyledTextContainer type={type} weight={weight} color={color} {...props}>
      {children}
    </StyledTextContainer>
  );
};
