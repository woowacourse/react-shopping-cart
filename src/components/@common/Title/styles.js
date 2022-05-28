import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Icon from 'components/@common/Icon';

import { BRAND_COLORS, COLORS } from 'styles/theme';

import { getPixelToRem } from 'lib/formatterUtils';

const TITLE_TYPE = {
  PAGE: css`
    padding: 1.5rem;

    border-bottom: 0.25rem solid ${COLORS.GRAY_50};
    margin-bottom: 1rem;
  `,

  CONTENT: css`
    padding: 1em 0.8em;

    border-bottom: 1px solid ${COLORS.GRAY_150};
  `,
};

const Container = styled.div`
  width: 100%;

  ${({ size }) =>
    size &&
    css`
      font-size: ${getPixelToRem(size)}rem;
    `}

  ${({ type }) => TITLE_TYPE[type.toUpperCase()]}
`;

const PageTitle = styled.h1`
  display: flex;
  align-items: center;

  font-size: 1em;
  font-weight: bold;

  &:not(:last-child) {
    margin-bottom: 0.7em;
  }

  ${Icon} {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 0.7em;

    color: ${BRAND_COLORS.PRIMARY_FONT};
    background-color: ${BRAND_COLORS.PRIMARY};

    border-radius: 50%;
    width: 2.6em;
    height: 2.6em;

    font-size: 0.7em;
  }
`;

const PageDescription = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.55em;
  color: ${COLORS.GRAY_100};

  ${Icon} {
    color: ${COLORS.GRAY_50};
    margin-right: 0.5em;
  }
`;

export { Container, PageTitle, PageDescription };
