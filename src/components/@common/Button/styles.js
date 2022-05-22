import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

import { LAYOUT, COLORS, BRAND_COLORS } from 'styles/theme';

const BUTTON_TYPE = {
  BUTTON: css`
    padding: 0.6em 1.2em;
    border: 1px solid ${COLORS.GRAY_150};
    background-color: ${COLORS.WHITE};
    border-radius: unset;
  `,

  ICON: css`
    padding: 0.25em 0.35em;
    border: 1px solid ${COLORS.GRAY_150};
    background-color: ${COLORS.WHITE};
  `,
};

const BUTTON_STATE_COLOR = (state) => {
  const backgroundColorKey = state.toUpperCase();
  const fontColorKey = `${state.toUpperCase()}_FONT`;

  return css`
    background-color: ${BRAND_COLORS[backgroundColorKey]};
    color: ${BRAND_COLORS[fontColorKey]};
  `;
};

const Container = styled.button`
  cursor: pointer;

  font-size: 1em;
  transition: filter 0.3s ease, color 0.3s ease;
  border-radius: ${LAYOUT.BORDER_RADIUS}px;
  color: inherit;

  ${({ containerType }) => BUTTON_TYPE[containerType]}
  ${({ state }) => BUTTON_STATE_COLOR(state)}
  ${({ state }) =>
    state !== 'default' &&
    css`
      border: none;
    `}

  &:hover {
    filter: brightness(0.95);
  }

  &::before {
    content: '\\${({ icon }) => icon}';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    ${({ containerType }) =>
      (containerType === 'BUTTON' &&
        css`
          padding-right: 0.5em;
          opacity: 0.7;
        `) ||
      (containerType === 'ICON' &&
        css`
          font-size: 0.8em;
        `)}
  }
`;

export { Container };
