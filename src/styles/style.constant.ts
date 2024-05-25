import { css } from 'styled-components';

export const COLOR = {
  black: '#000000',
  white: '#ffff',
  lightGray: '#f7f7f7',
  disableButtonColor: '#BEBEBE',
  borderColor: '#0000001a',
  gray: '#EEEEEE',
} as const;

export const SIZE = {
  layoutWidth: {
    max: '485px',
    min: '334px',
    basic: '100vw',
  },
  navigationHeight: '64px',
  bottomButtonHeight: '64px',
  layoutPadding: '24px',
} as const;

export const BORDER_RADIUS = '10PX';

export const APP_LAYOUT_SIZE = css`
  min-width: ${SIZE.layoutWidth.min};
  width: ${SIZE.layoutWidth.basic};
  max-width: ${SIZE.layoutWidth.max};
`;
export const APP_LAYOUT_FIXED_COMPONENT_STYLE = css`
  ${APP_LAYOUT_SIZE}
  left: calc((100% - ${SIZE.layoutWidth.basic}) / 2);

  @media screen and (min-width: 768px) {
    left: calc((100% - ${SIZE.layoutWidth.max}) / 2);
  }
`;
