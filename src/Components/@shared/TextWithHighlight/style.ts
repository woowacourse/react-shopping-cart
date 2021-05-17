import styled from "styled-components";

interface TextProps {
  fontSize: string;
  color: string;
  fontWeight: string;
}

const Text = styled.span<TextProps>`
  display: inline-block;
  position: relative;

  ${({ fontSize, color, fontWeight }) => `
    font-size: ${fontSize};
    color: ${color};
    font-weight:${fontWeight};
  `}
`;

interface HighlightProps {
  highlightColor: string;
}

const HighLight = styled.span<HighlightProps>`
  position: absolute;
  top: 65%;
  right: 0;
  left: 0;
  bottom: 5%;
  background-color: ${({ highlightColor }) => highlightColor};
  opacity: 0.5;
`;

export { Text, HighLight, TextProps, HighlightProps };
