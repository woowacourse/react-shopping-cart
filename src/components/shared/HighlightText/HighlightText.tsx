import React, { ReactElement } from 'react';
import Styled from './HighlightText.styles';

interface Props {
  text: string;
}

const HighlightText = (props: Props): ReactElement => {
  const { text } = props;

  return <Styled.Root>{text}</Styled.Root>;
};

export default HighlightText;
