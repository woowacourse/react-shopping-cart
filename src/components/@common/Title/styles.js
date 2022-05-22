import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Icon from 'components/@common/Icon';

import { getPixelToRem } from 'lib/formatterUtils';
import { BRAND_COLORS, COLORS } from 'styles/theme';

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;

  border-bottom: 0.25rem solid ${COLORS.GRAY_50};
  margin-bottom: 1rem;

  ${({ size }) =>
    size &&
    css`
      font-size: ${getPixelToRem(size)}rem;
    `}
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
