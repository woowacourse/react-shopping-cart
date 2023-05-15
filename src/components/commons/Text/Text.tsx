import { HTMLAttributes } from 'react';

import { StyledText } from './Text.styled';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  text: string | number;
  fontSize?: string;
  lineHeight?: string;
}

const Text = (props: TextProps) => {
  const { text, color, fontSize = '16px', lineHeight = '24px' } = props;

  return (
    <StyledText color={color} fontSize={fontSize} lineHeight={lineHeight}>
      {text}
    </StyledText>
  );
};

export default Text;
