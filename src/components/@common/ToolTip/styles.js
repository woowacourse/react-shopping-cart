import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';

import { COLORS, LAYOUT } from 'styles/theme';

const ALIGN_TRANSFORM = {
  TOP: css`
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);

    &::after {
      border-top: 5px solid ${COLORS.LIGHTEN_MIN};
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      bottom: -4px;

      left: 50%;
      transform: translateX(-50%);
    }
  `,

  BOTTOM: css`
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(100%);

    &::after {
      border-bottom: 5px solid ${COLORS.LIGHTEN_MIN};
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      top: -4px;

      left: 50%;
      transform: translateX(-50%);
    }
  `,

  LEFT: css`
    top: 50%;
    left: -0.5rem;
    transform: translateX(-100%) translateY(-50%);

    &::after {
      border-bottom: 5px solid transparent;
      border-top: 5px solid transparent;
      border-left: 5px solid ${COLORS.LIGHTEN_MIN};
      right: -4px;

      top: 50%;
      transform: translateY(-50%);
    }
  `,

  RIGHT: css`
    top: 50%;
    right: -0.5rem;
    transform: translateX(100%) translateY(-50%);

    &::after {
      border-bottom: 5px solid transparent;
      border-top: 5px solid transparent;
      border-right: 5px solid ${COLORS.LIGHTEN_MIN};
      left: -4px;

      top: 50%;
      transform: translateY(-50%);
    }
  `,
};

const Text = styled.div`
  position: absolute;
  visibility: hidden;
  border-radius: ${LAYOUT.BORDER_RADIUS}px;
  text-align: center;
  background-color: ${COLORS.LIGHTEN_MIN};
  color: ${COLORS.LIGHTEN_MAX};
  white-space: nowrap;
  padding: 0.425rem;
  font-size: 0.75rem;

  opacity: 0;
  transition: opacity 0.3s ease;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      display: none;
    `}

  &::after {
    content: '';
    position: absolute;
  }

  ${({ align }) => ALIGN_TRANSFORM[align.toUpperCase()] || ALIGN_TRANSFORM.TOP};
`;

const Container = styled.div`
  position: relative;
  display: inline;
  overflow: visible;

  &:hover {
    ${Text} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export { Container, Text };
