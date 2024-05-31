import { PropsWithChildren, HTMLAttributes, createElement } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

function Heading({ level, children, ...props }: PropsWithChildren<Props>) {
  const HeadingTag = `h${level}`;

  return createElement(HeadingTag, props, children);
}

export default Heading;
