import styled, { css, CSSProperties } from 'styled-components';

type Direction = CSSProperties['flexDirection'];
type Wrap = CSSProperties['flexWrap'];
type Justify = CSSProperties['justifyContent'];
type Align = CSSProperties['alignItems'];

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
