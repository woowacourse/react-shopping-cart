import { ReactNode } from 'react';
import styled from 'styled-components';

type Direction = 'row' | 'column';

type CenterBoxWrapperProps = {
  direction?: Direction;
  gap?: string;
};

const CenterBoxWrapper = styled.div<CenterBoxWrapperProps>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: ${({ direction }) => direction};

  ${({ gap, direction }) => {
    switch (direction) {
      case 'column':
        return `
        row-gap: ${gap};
      `;
      case 'row':
        return `
        column-gap: ${gap};
      `;
    }
  }}
`;

const CenterBox = ({
  children,
  direction = 'column',
  gap = '0px',
}: CenterBoxWrapperProps & { children: ReactNode }) => {
  return (
    <CenterBoxWrapper direction={direction} gap={gap}>
      {children}
    </CenterBoxWrapper>
  );
};

export default CenterBox;
