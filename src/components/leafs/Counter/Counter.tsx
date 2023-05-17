import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export type CounterProps = InputHTMLAttributes<HTMLInputElement>;

export default function Counter(props: CounterProps) {
  return <CounterInput {...props} />;
}

const CounterInput = styled.input`
  width: 64px;
  height: 28px;
  border: 1px solid #dddddd;
  border-radius: 0px;

  text-align: center;

  &::-webkit-inner-spin-button {
    opacity: 1;
    height: 28px;
  }
`;
