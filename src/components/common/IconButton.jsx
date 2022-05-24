import React from "react";
import { StyledIconButton, StyledIconButtonImg } from "./IconButton.styled";

function IconButton({ title, onClick, iconImgSrc, iconImgAlt, width }) {
  return (
    <StyledIconButton title={title} onClick={onClick} width={width}>
      <StyledIconButtonImg src={iconImgSrc} alt={iconImgAlt} width={width} />
    </StyledIconButton>
  );
}

export default IconButton;
