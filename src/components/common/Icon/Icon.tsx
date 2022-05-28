import styled, { css } from 'styled-components';
import Icons from './icons';
import type { IconNames } from './icons';

interface IconPropsType {
  iconName: IconNames;
  size?: string;
  color?: string;
  hoverColor?: string;
}

const StyledWrapper = styled.div`
  & svg {
    fill: currentColor;
  }

  ${({ size, color, hoverColor }: Pick<IconPropsType, 'size' | 'color' | 'hoverColor'>) => css`
    color: ${color};
    width: ${size}px;
    height: ${size}px;

    &:hover {
      color: ${hoverColor};
    }
  `}
`;

const Icon = ({ iconName, size = '24', color = 'white', ...props }: IconPropsType) => {
  const IconComponent = Icons[iconName];
  return (
    <StyledWrapper size={size} color={color} {...props}>
      <IconComponent width="100%" height="100%" />
    </StyledWrapper>
  );
};

export default Icon;
