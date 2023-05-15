import { HTMLAttributes } from 'react';

import { StyledHeading } from './Heading.styled';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  text: string;
  fontSize?: string;
  lineHeight?: string;
}

const Heading = (props: HeadingProps) => {
  const { text, color, fontSize = '40px', lineHeight = '40px' } = props;

  return (
    <StyledHeading color={color} fontSize={fontSize} lineHeight={lineHeight}>
      {text}
    </StyledHeading>
  );
};

export default Heading;
