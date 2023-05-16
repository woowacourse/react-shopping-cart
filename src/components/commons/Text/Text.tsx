import { HTMLAttributes, ReactNode } from 'react';

import { StyledText } from './Text.styled';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  fontStyle?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

export const BaseText = (props: TextProps) => {
  const {
    children = null,
    color = 'black',
    fontStyle = 'normal',
    fontSize = '16px',
    fontWeight = '500',
    lineHeight = '',
  } = props;

  return (
    <StyledText
      color={color}
      fontStyle={fontStyle}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {children}
    </StyledText>
  );
};

export const Title = (props: TextProps) => {
  return <BaseText fontSize="32px" fontWeight="700" {...props} />;
};

export const Paragraph = (props: TextProps) => {
  return <BaseText fontSize="20px" fontWeight="500" {...props} />;
};

export const Description = (props: TextProps) => {
  return <BaseText fontSize="16px" fontWeight="400" {...props} />;
};
