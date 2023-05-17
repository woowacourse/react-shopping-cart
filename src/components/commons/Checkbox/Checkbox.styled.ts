import styled from 'styled-components';

import { CheckboxProps } from './Checkbox';

export const StyledOuterCheckbox = styled.div<CheckboxProps>`
  position: relative;

  width: ${props => (props.width ? `${Number(props.width)}px` : '28px')};
  height: ${props => (props.height ? `${Number(props.height)}px` : '28px')};

  border: ${props => props.border ?? '1px solid #22A6A2'};
  border-radius: ${props =>
    props.borderRadius ? `${Number(props.borderRadius)}px` : '4px'};

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

  width: ${props => (props.width ? `${Number(props.width) - 2}px` : `27px`)};
  height: ${props => (props.height ? `${Number(props.height) - 2}px` : `27px`)};

  border: ${props => props.border ?? '1px solid #3288FF'};
  border-radius: ${props =>
    props.borderRadius ? `${Number(props.borderRadius)}px` : '4px'};

  background-color: ${props => props.backgroundColor ?? '#333333'};

  cursor: pointer;
`;
