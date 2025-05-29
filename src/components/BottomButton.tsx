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
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    background-color: ${({ disabled }) =>
      disabled ? '#BEBEBE;' : ' #000000;'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  `,
};
