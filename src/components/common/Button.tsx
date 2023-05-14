import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: 'primary';
  designType: 'square' | 'rectangle';
}

export default function Button({ bgColor, designType, ...props }: Partial<Props>) {
  return (
    <Style.Button className={designType} {...props}>
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
    background-color: var(--grey-100);

    color: var(--grey-100);
    cursor: pointer;

    &.square {
      color: var(--grey-600);
      text-align: center;
      line-height: 28px;
    }

    &.rectangle {
      width: 388px;
      height: 73px;
      border: ${(props) => props.bgColor && 'solid 1px var(--grey-300)'};
      background-color: ${(props) => props.bgColor && 'var(--primary-color)'};

      color: ${(props) => props.bgColor && 'var(--grey-100)'};
    }

    &:disabled {
      color: var(--grey-300);
    }
  `,
};
