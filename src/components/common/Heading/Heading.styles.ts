import styled, { css } from 'styled-components';

import { HeadingProps } from './Heading';

const getSizeStyling = (size: Required<HeadingProps>['size']) => {
  const style = {
    xxLarge: css`
      font-size: 40px;
      line-height: 52px;
    `,
    xLarge: css`
      font-size: 36px;
      line-height: 44px;
    `,
    large: css`
      font-size: 32px;
      line-height: 40px;
    `,
    medium: css`
      font-size: 28px;
      line-height: 36px;
    `,
    small: css`
      font-size: 24px;
      line-height: 32px;
    `,
    xSmall: css`
      font-size: 20px;
      line-height: 28px;
    `,
  };

  return style[size];
};

const Heading = styled.div<HeadingProps>`
  font-weight: 600;
  ${({ size = 'medium' }) => getSizeStyling(size)}
`;

export { Heading };
