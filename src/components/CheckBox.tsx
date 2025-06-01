import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

const CheckBox = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return <S.CheckBox data-testid="checkBox" type="checkbox" {...rest} />;
};

export default CheckBox;

const S = {
  CheckBox: styled.input<InputHTMLAttributes<HTMLInputElement>>`
    cursor: pointer;
    background-color: ${({ checked }) => (checked ? '#000000' : 'transparent')};
    border: ${({ checked }) => (checked ? '2px solid #000000' : `2px solid #e6e6e6`)};
    border-radius: 8px;
  `,
};
