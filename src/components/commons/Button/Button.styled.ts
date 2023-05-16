import styled from 'styled-components';
import { ButtonProps } from './Button';

export const StyledButton = styled.button<ButtonProps>`
  width: ${props => props.width};
  height: ${props => props.height};

  padding: ${props => props.padding};

  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};

  background-color: ${props => props.backgroundColor};
`;
