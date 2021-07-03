import React, { ReactText } from "react";

import { Text, HighLight, TextProps, HighlightProps } from "./style";

interface TextWithHighlightProps extends TextProps, HighlightProps {
  children: ReactText | undefined;
}

const TextWithHighlight = ({ children, highlightColor, ...props }: TextWithHighlightProps) => (
  <Text {...props}>
    {children}
    <HighLight highlightColor={highlightColor} />
  </Text>
);

export default TextWithHighlight;
export { TextWithHighlightProps };
