import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

interface BottomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const BottomButton = ({ title, ...rest }: BottomButtonProps) => {
  return <S.Button {...rest}>{title}</S.Button>;
};

export default BottomButton;

const S = {
  Button: styled.button`
    width: 100%;
    height: 64px;
    background-color: #000000;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  `,
};
