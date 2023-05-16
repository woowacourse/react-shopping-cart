import { HTMLAttributes, ReactNode } from 'react';

import { StyledTitle, StyledText } from './Text.styled';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
  fontStyle?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

const BaseTitle = (props: TextProps) => {
  const {
    children = null,
    color = 'black',
    fontStyle = 'normal',
    fontSize = '40px',
    fontWeight = '700',
    lineHeight = 'none',
  } = props;

  return (
    <StyledTitle
      color={color}
      fontStyle={fontStyle}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {children}
    </StyledTitle>
  );
};

export const Title = (props: TextProps) => {
  return <BaseTitle fontSize="40px" fontWeight="700" {...props} />;
};

const BaseText = (props: TextProps) => {
  const {
    children = null,
    color = 'black',
    fontStyle = 'normal',
    fontSize = '20px',
    fontWeight = '500',
    lineHeight = 'none',
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

export const Paragraph = (props: TextProps) => {
  return <BaseText fontSize="20px" fontWeight="500" {...props} />;
};

export const Description = (props: TextProps) => {
  return <BaseText fontSize="16px" fontWeight="400" {...props} />;
};
