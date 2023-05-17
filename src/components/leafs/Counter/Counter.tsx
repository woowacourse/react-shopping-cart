import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export type CounterProps = InputHTMLAttributes<HTMLInputElement> & {
  counterSize: 'default' | 'large';
};

export default function Counter(props: CounterProps) {
  return <Input {...props} />;
}

const Input = styled.input<CounterProps>`
  width: ${(props) => (props.counterSize === 'large' ? '114px' : '64px')};
  height: ${(props) => (props.counterSize === 'large' ? '60px' : '28px')};
  border: 1px solid #dddddd;
  border-radius: 0px;

  font-size: ${(props) => (props.counterSize === 'large' ? '20px' : '14px')};

  text-align: center;

  &::-webkit-inner-spin-button {
    width: ${(props) => (props.counterSize === 'large' ? '32px' : '15px')};
    opacity: 0.5;

    height: ${(props) => (props.counterSize === 'large' ? '60px' : '28px')};
  }
`;
