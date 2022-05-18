import React from "react";
import styled from "styled-components";

function HighlightedText({ highlightColor, children }) {
  return (
    <TextWrapper highlightColor={highlightColor}>
      <Text>{children}</Text>
    </TextWrapper>
  );
}

const TextWrapper = styled.p`
  height: 8px;
  margin-top: 14px;
  padding: 0 2px;

  background-color: ${({ theme, highlightColor }) =>
    highlightColor || theme.color.primary_light};
`;

const Text = styled.p`
  position: relative;
  top: -200%;

  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.grey_700};
`;

export default HighlightedText;
