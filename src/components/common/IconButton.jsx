import React from "react";
import * as S from "./IconButton.styled";

function IconButton({ title, onClick, iconImgSrc, iconImgAlt, width }) {
  return (
    <S.IconButton title={title} onClick={onClick} width={width}>
      <S.IconButtonImg src={iconImgSrc} alt={iconImgAlt} width={width} />
    </S.IconButton>
  );
}

export default IconButton;
