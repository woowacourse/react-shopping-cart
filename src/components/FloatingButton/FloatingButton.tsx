import React from 'react';
import * as S from './styled';

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const FloatingButton = ({ label }: FloatingButtonProps) => {
  return <S.Button>{label}</S.Button>;
};

export default FloatingButton;
