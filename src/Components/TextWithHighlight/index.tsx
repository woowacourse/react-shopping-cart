import React, { FC } from "react";

import { Text, HighLight, TextProps, HighlightProps } from "./style";

interface TextWithhighlightProps extends TextProps, HighlightProps {
  text: string;
}

const TextWithHighlight: FC<TextWithhighlightProps> = ({ highlightColor, text, ...props }) => (
  <Text {...props}>
    {text}
    <HighLight highlightColor={highlightColor} />
  </Text>
);

export default TextWithHighlight;
export { TextWithhighlightProps };
