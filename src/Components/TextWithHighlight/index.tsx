import React, { FC, ReactText } from "react";

import { Text, HighLight, TextProps, HighlightProps } from "./style";

interface TextWithHighlightProps extends TextProps, HighlightProps {
  children: ReactText | undefined;
}

const TextWithHighlight: FC<TextWithHighlightProps> = ({ children, highlightColor, ...props }) => (
  <Text {...props}>
    {children}
    <HighLight highlightColor={highlightColor} />
  </Text>
);

export default TextWithHighlight;
export { TextWithHighlightProps };
