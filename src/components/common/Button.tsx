import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: string;
  designType: 'text' | 'square' | 'rectangle';
}

export default function Button({ bgColor, designType, ...props }: Partial<Props>) {
  return (
    <Style.Button className={designType} bgColor={bgColor} {...props}>
      {props.children}
    </Style.Button>
  );
}

const Style = {
  Button: styled.button<Partial<Props>>`
    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 7px;
    background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--grey-100)')};

    color: var(--grey-100);
    cursor: pointer;

    &.text {
      color: ${(props) => (props.color ? props.color : 'var(--grey-500)')};
      background-color: transparent;
    }

    &.square {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 28px;
      height: 28px;

      color: var(--grey-600);
      text-align: center;
      line-height: 28px;
    }

    &.rectangle {
      width: 388px;
      height: 73px;

      color: ${(props) => (props.color ? props.color : 'var(--grey-500)')};
    }

    &:disabled {
      color: var(--grey-300);
    }
  `,
};
