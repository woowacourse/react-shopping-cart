import { ButtonHTMLAttributes } from 'react';

import * as styled from './Button.styled';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: 'primary';
  designType: 'square' | 'rectangle';
}

export const Button = ({ bgColor, designType, ...props }: Partial<Props>) => {
  return (
    <styled.Button className={designType} {...props}>
      {props.children}
    </styled.Button>
  );
};
