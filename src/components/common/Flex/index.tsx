import styled, { css } from 'styled-components';

type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Justify = 'normal' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
type Align = 'normal' | 'center' | 'start' | 'flex-start' | 'end' | 'flex-end' | 'stretch';

interface FlexProp {
  direction?: Direction;
  wrap?: Wrap;
  justify?: Justify;
  align?: Align;
  gap?: number;
}

const Flex = styled.div`
  ${({ direction, wrap, justify, align, gap }: FlexProp) => css`
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap}px;
  `}
`;

Flex.defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  gap: 0,
};

export default Flex;
