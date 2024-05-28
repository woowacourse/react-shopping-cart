import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type Direction = 'row' | 'column';

type ListContainerWIthDirectionProps = {
  direction?: Direction;
  gap?: string;
};

const FlexContainer = styled.div<ListContainerWIthDirectionProps>`
  display: flex;

  ${({ direction, gap }) => {
    switch (direction) {
      case 'row':
        return `
          flex-direction: row;
          column-gap: ${gap};
        `;
      case 'column':
        return `
          flex-direction: column;
          row-gap: ${gap}
        `;
    }
  }}
`;
type ContainerProps = HTMLAttributes<HTMLDivElement> &
  ListContainerWIthDirectionProps & {
    children: ReactNode;
  };

const Flex = ({ direction = 'column', gap = '0px', children, ...rest }: ContainerProps) => {
  return (
    <FlexContainer direction={direction} gap={gap} {...rest}>
      {children}
    </FlexContainer>
  );
};

export default Flex;
