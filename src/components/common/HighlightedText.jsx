import React from "react";
import { StyledTextWrapper, StyledText } from "./HighlightedText.styled";

function HighlightedText({ highlightColor, children }) {
  return (
    <StyledTextWrapper highlightColor={highlightColor}>
      <StyledText>{children}</StyledText>
    </StyledTextWrapper>
  );
}

export default HighlightedText;
