import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { BRAND_COLORS, COLORS, LAYOUT } from 'styles/theme';

import { ICON_CODE } from 'constants/';
import { getPixelToRem } from 'lib/formatterUtils';

const SIZE_PROP = (size) => {
  const sizeOption = typeof size === 'string' ? size.toUpperCase() : size;

  switch (sizeOption) {
    case 'LARGE':
      return '1.5rem';

    case 'MEDIUM':
      return '1rem';

    case 'SMALL':
      return '0.8rem';

    default:
      return `${getPixelToRem(size)}rem`;
  }
};

const Container = styled.label`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ size }) =>
    size &&
    css`
      font-size: ${SIZE_PROP(size)};
    `}

  &::before {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    width: 1.1em;
    height: 1.1em;
    border: 0.125em solid ${COLORS.GRAY_70};
    border-radius: ${LAYOUT.BORDER_RADIUS}px;

    ${({ checked }) =>
      checked
        ? css`
            content: '\\${ICON_CODE.CHECK}';
            background-color: ${BRAND_COLORS.PRIMARY};
            border-color: ${BRAND_COLORS.PRIMARY};
            color: ${BRAND_COLORS.PRIMARY_FONT};
          `
        : css`
            content: '';
          `}
  }
`;

const Check = styled.input`
  display: none;
`;

const Text = styled.span`
  margin-left: 0.7em;
  font-size: 0.85em;
`;

export { Container, Check, Text };
