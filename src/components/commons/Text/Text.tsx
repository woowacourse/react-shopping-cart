import { HTMLAttributes, ReactNode } from 'react';

import { StyledText } from './Text.styled';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  fontStyle?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

const BaseText = (props: TextProps) => {
  const {
    children = null,
    color,
    fontStyle = 'normal',
    fontSize = '16px',
    fontWeight = '500',
    lineHeight = '24px',
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
  return <BaseText {...props} fontSize="32px" fontWeight="700" />;
};

export const Paragraph = (props: TextProps) => {
  return <BaseText {...props} fontSize="20px" fontWeight="500" />;
};

export const Description = (props: TextProps) => {
  return <BaseText {...props} fontSize="16px" fontWeight="400" />;
};
