import styled from 'styled-components';

import { CheckboxProps } from './Checkbox';

export const StyledCheckbox = styled.div<CheckboxProps>`
  position: relative;

  width: ${props => (props.width ? `${props.width}px` : '28px')};
  height: ${props => (props.height ? `${props.height}px` : '28px')};
`;

export const StyledOuterCheckbox = styled.div<CheckboxProps>`
  position: absolute;

  width: 100%;
  height: 100%;

  border: ${props => props.border ?? '1px solid #22A6A2'};
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : '4px'};

  background-color: ${props => props.backgroundColor ?? 'white'};

  cursor: pointer;
`;

export const StyledInnerCheckbox = styled.div<CheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;

  border: ${props => props.border ?? '1px solid #3288FF'};
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : '4px'};

  background-color: ${props => props.backgroundColor ?? '#333333'};

  cursor: pointer;
`;
