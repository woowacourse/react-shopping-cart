import styled, { CSSProperties } from 'styled-components';

interface FlexBoxProps {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
}

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  align-items: ${({ align = 'flex-start' }) => align};
  gap: ${({ gap }) => gap};
`;

export default FlexBox;
