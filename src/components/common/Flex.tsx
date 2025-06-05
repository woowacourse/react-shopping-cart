import styled from '@emotion/styled';
import { ElementType, PropsWithChildren } from 'react';

interface FlexProps {
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'stretch' | 'flex-end';
  gap?: GapType;
  className?: string;
  as?: ElementType;
}

type GapType = 'xs' | 'sm' | 'md' | 'lg';

const GAP_MAP: Record<GapType, string> = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
};

function Flex({ className, children, ...props }: PropsWithChildren<FlexProps>) {
  return (
    <Container className={className} {...props}>
      {children}
    </Container>
  );
}

const Container = styled.div<FlexProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'column'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'center'};
  align-items: ${({ alignItems }) => alignItems ?? 'center'};
  gap: ${({ gap }) => (gap ? GAP_MAP[gap] : GAP_MAP['sm'])};
`;

export default Flex;
