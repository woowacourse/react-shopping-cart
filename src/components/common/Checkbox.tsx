import { InputHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  itemId: number;
  toggleCheckbox: (id: number) => void;
}

export default function Checkbox({ itemId, toggleCheckbox, ...props }: Props) {
  return <Style.Checkbox type="checkbox" onChange={() => toggleCheckbox(itemId)} {...props} />;
}

const Style = {
  Checkbox: styled.input<Partial<Props>>`
    width: 20px;
    height: 20px;

    cursor: pointer;
  `,
};
