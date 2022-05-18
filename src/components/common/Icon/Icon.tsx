import React from 'react';
import styled, { css } from 'styled-components';
import Icons from './icons';
import type { IconNames } from './icons';

interface IconPropsType {
  iconName: IconNames;
  size?: string;
  color?: string;
}

const StyledWrapper = styled.div`
  & svg {
    fill: currentColor;
  }

  ${({ size, color }: Pick<IconPropsType, 'size' | 'color'>) => css`
    color: ${color};
    width: ${size}px;
    height: ${size}px;
  `}
`;

function Icon({ iconName, size = '24', color = 'white' }: IconPropsType) {
  const IconComponent = Icons[iconName];
  return (
    <StyledWrapper size={size} color={color}>
      <IconComponent width="100%" height="100%" />
    </StyledWrapper>
  );
}

export default Icon;
