import { InputHTMLAttributes } from 'react';
import * as Styled from './styles/Input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width: string;
  height: string;
}

export const Input = ({ width = '160px', height = '36px' }: InputProps) => {
  return <Styled.Input width={width} height={height} />;
};
