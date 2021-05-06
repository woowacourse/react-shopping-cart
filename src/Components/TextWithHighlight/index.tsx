import React, { VFC } from "react";

import { Text, HighLight, TextProps, HighlightProps } from "./style";

interface TextWithhighlightProps extends TextProps, HighlightProps {
  text: string;
}

// TODO: rest 파라미터 사용 목적과 기준
const TextWithHighlight: VFC<TextWithhighlightProps> = ({
  highlightColor,
  text,
  fontSize,
  ...props
}) => (
  <Text fontSize={fontSize} {...props}>
    {text}
    <HighLight highlightColor={highlightColor} />
  </Text>
);

export default TextWithHighlight;
export { TextWithhighlightProps };
