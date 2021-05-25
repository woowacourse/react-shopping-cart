import React, { ReactElement } from 'react';
import Styled from './HighlightText.styles';

interface IProps {
  text: string;
}

const HighlightText = (props: IProps): ReactElement => {
  const { text } = props;

  return <Styled.Root>{text}</Styled.Root>;
};

export default HighlightText;
