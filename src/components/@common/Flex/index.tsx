import styled, { css } from 'styled-components';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Justify = 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type Align = 'normal' | 'center' | 'start' | 'flex-start' | 'end' | 'flex-end' | 'stretch';

interface FlexProps {
  w?: string;
  h?: string;
  direction?: Direction;
  wrap?: Wrap;
  justify?: Justify;
  align?: Align;
  gap?: string;
}

const Flex = styled.div`
  ${({ w, h, direction, wrap, justify, align, gap }: FlexProps) => css`
    width: ${w};
    height: ${h};

    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap};
  `}
`;

Flex.defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  gap: '0',
};

export default Flex;
