import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

const TextUnderline = styled.span`
  position: relative;
  display: inline-block;

  &::before {
    content: '';

    display: block;
    position: absolute;
    left: 0px;
    bottom: 0px;

    background-color: ${({ color }) => color || COLORS.MINT_900};
    width: 100%;
    height: 30%;

    z-index: 0;
  }

  &::after {
    content: '${({ text }) => text}';

    display: inline-block;
    position: relative;

    z-index: 1;
  }
`;

export { TextUnderline };
