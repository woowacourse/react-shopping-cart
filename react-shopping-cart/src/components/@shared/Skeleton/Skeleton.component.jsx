import styled, { css, keyframes } from 'styled-components';

import { withOpacityValue } from 'utils';

const refresh = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

const Skeleton = styled.div`
  ${({ theme }) => css`
    background-image: linear-gradient(
      90deg,
      ${withOpacityValue(theme.colors['BLACK_002'], 0.02)},
      ${withOpacityValue(theme.colors['BLACK_002'], 0.06)},
      ${withOpacityValue(theme.colors['BLACK_002'], 0.02)}
    );
  `}
  animation: ${refresh} 2s infinite ease-out;
  -webkit-animation: ${refresh} 2s infinite ease-out;
  ${({ width, height }) =>
    css`
      width: ${width};
      height: ${height};
    `}
`;

export default Skeleton;
