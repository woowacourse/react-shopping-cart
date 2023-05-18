import { InputHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  itemId: number;
  handleCheckedItem: (id: number) => void;
}

export default function Checkbox({ itemId, handleCheckedItem, ...props }: Props) {
  return <Style.Checkbox type="checkbox" onChange={() => handleCheckedItem(itemId)} {...props} />;
}

const Style = {
  Checkbox: styled.input<Partial<Props>>`
    width: 20px;
    height: 20px;

    cursor: pointer;
  `,
};
