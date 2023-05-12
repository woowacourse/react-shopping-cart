import styled, { CSSProperties } from 'styled-components';

interface FlexBoxProps {
  flexDirection?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
}

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justify = 'center' }) => justify};
  align-items: ${({ align = 'center' }) => align};
  gap: ${({ gap }) => gap};
`;

export default FlexBox;
