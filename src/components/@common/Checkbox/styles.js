import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { BRAND_COLORS, COLORS, LAYOUT } from 'styles/theme';
import { ICON_CODE } from 'constants/';

const SIZE_PROP = (size) => {
  switch (size) {
    case 'LARGE':
      return '1.5rem';

    case 'MEDIUM':
      return '1rem';

    case 'SMALL':
      return '0.8rem';

    default:
      return `${(size / LAYOUT.ROOT_PIXEL_SIZE).toFixed(2)}rem`;
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
      font-size: ${SIZE_PROP(size.toUpperCase())};
    `}

  &::before {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    width: 1.3em;
    height: 1.3em;
    border: 0.125em solid ${COLORS.GRAY_70};
    border-radius: ${LAYOUT.BORDER_RADIUS}px;
    margin-right: 0.5em;

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

export { Container, Check };
