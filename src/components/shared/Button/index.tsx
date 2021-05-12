import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

type Size = 'small' | 'medium' | 'large';

interface Props {
  size?: Size;
  backgroundColor?: string;
  disabled?: boolean;
}

const smallStyle = css`
  width: 8.625rem;
  height: 3rem;
`;

const mediumStyle = css`
  width: 24.25rem;
  height: 4.5rem;
`;

const largeStyle = css`
  width: 39.875rem;
  height: 6rem;
`;

const sizeMap: { [key: string]: FlattenSimpleInterpolation } = {
  small: smallStyle,
  medium: mediumStyle,
  large: largeStyle,
};

const Button = styled.button<Props>`
  position: relative;
  background-color: ${(props) => props.backgroundColor || `rgba(0, 0, 0, 0)`};
  background-color: ${(props) => props.disabled && `rgba(0, 0, 0, 0.2)`};
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 0.125rem;
  overflow: hidden;

  ${({ size }) => (size ? sizeMap[size] : mediumStyle)}

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Button;
