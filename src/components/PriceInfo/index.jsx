import React from 'react';
import { TitleStyled, SubTitleStyled } from './style';

function PriceInfo({ title, subTitle, price }) {
  return (
    <>
      <TitleStyled>{title}</TitleStyled>
      <SubTitleStyled>
        <mark>{subTitle}</mark>
        <mark>{price.toLocaleString()}원</mark>
      </SubTitleStyled>
    </>
  );
}

export default PriceInfo;
