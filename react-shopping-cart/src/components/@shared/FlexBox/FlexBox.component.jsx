import styled, { css } from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  ${({ direction }) =>
    css`
      flex-direction: ${direction};
    `}
  ${({ gap }) =>
    css`
      gap: ${gap};
    `}
  ${({ justifyContent }) =>
    css`
      justify-content: ${justifyContent};
    `}
  ${({ alignItems }) =>
    css`
      align-items: ${alignItems};
    `}
`;

export default FlexBox;
