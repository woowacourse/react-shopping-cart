import { ComponentProps, ReactNode } from 'react';

import { StyledFlexBox } from '@/shared/components/Flex/Flex.styled';

export type Props = {
  direction: 'row' | 'column';
  justifyContent:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
  alignItems:
    | 'normal'
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'stretch'
    | 'initial'
    | 'inherit';
  gap: string;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  children: ReactNode;
} & ComponentProps<'div'>;
export const Flex = ({
  direction,
  justifyContent,
  alignItems,
  gap = '0',
  margin,
  padding,
  width,
  height,
  children,
  ...props
}: Props) => {
  return (
    <StyledFlexBox
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      margin={margin}
      padding={padding}
      width={width}
      height={height}
      {...props}
    >
      {children}
    </StyledFlexBox>
  );
};
