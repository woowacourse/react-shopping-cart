import React from 'react';
import Styled from './HighlightText.styles';

type HighlightTextProps = {
  text: string;
};

const HighlightText = (props: HighlightTextProps) => {
  const { text } = props;

  return <Styled.Root>{text}</Styled.Root>;
};

export default HighlightText;
