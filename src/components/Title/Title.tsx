import React from 'react';
import * as S from './Title.styled';

interface TitleProps {
  title: string;
  subTitle?: string;
}

function Title({ title, subTitle }: TitleProps) {
  return (
    <S.TitleContainer>
      <S.TitleStyle>{title}</S.TitleStyle>
      <S.SubTitleStyle>{subTitle}</S.SubTitleStyle>
    </S.TitleContainer>
  );
}

export default Title;
