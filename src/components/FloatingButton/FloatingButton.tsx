import React from 'react';
import * as S from './styled';

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const FloatingButton = ({ label, ...props }: FloatingButtonProps) => {
  return <S.Button {...props}>{label}</S.Button>;
};

export default FloatingButton;
