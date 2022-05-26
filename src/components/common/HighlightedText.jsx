import React from "react";
import * as S from "./HighlightedText.styled";

function HighlightedText({ highlightColor, children }) {
  return (
    <S.TextWrapper highlightColor={highlightColor}>
      <S.Text>{children}</S.Text>
    </S.TextWrapper>
  );
}

export default HighlightedText;
