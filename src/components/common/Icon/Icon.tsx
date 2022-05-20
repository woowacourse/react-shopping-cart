import styled, { css } from 'styled-components';
import Icons from './icons';
import type { IconNames } from './icons';

interface IconPropsType {
  iconName: IconNames;
  size?: string;
  color?: string;
  clickable?: boolean;
  hoverColor?: string;
}

const StyledWrapper = styled.div`
  & svg {
    fill: currentColor;
  }

  ${({
    size,
    color,
    clickable,
    hoverColor,
  }: Pick<IconPropsType, 'size' | 'color' | 'clickable' | 'hoverColor'>) => css`
    color: ${color};
    width: ${size}px;
    height: ${size}px;

    &:hover {
      color: ${hoverColor};
    }

    cursor: ${clickable && 'pointer'};
  `}
`;

function Icon({
  iconName,
  size = '24',
  color = 'white',
  clickable = false,
  ...props
}: IconPropsType) {
  const IconComponent = Icons[iconName];
  return (
    <StyledWrapper size={size} color={color} clickable={clickable} {...props}>
      <IconComponent width="100%" height="100%" />
    </StyledWrapper>
  );
}

export default Icon;
