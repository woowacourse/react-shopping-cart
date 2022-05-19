import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

import { LAYOUT, COLORS } from 'styles/theme';

const BUTTON_TYPE = {
  BUTTON: css`
    padding: 0.8rem 1.2rem;
  `,

  ICON: css`
    padding: 0.25rem 0.35rem;
  `,
};

const Container = styled.button`
  cursor: pointer;

  font-size: 1rem;
  border: 1px solid ${COLORS.GRAY_150};
  background-color: ${COLORS.GRAY_250};
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: ${LAYOUT.BORDER_RADIUS}px;

  ${({ containerType }) => BUTTON_TYPE[containerType]}

  &:hover {
    color: ${COLORS.BLUE_150};
    background-color: ${COLORS.GRAY_200};
  }

  &::before {
    content: '\\${({ icon }) => icon}';

    ${({ containerType }) =>
      containerType === 'ICON' &&
      css`
        font-size: 0.8rem;
      `}
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    ${({ containerType }) =>
      containerType === 'BUTTON' &&
      css`
        padding-right: 0.5rem;
      `}
  }
`;

export { Container };
