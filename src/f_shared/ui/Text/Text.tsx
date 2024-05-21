import classNames from 'classnames/bind';

import css from './Text.module.css';

const cn = classNames.bind(css);

type TextType = 'h1' | 'h2' | 'b1' | 'b2';

type TextElement = 'p' | 'span';

interface TextProps {
  children: string;
  className?: string;
  tag?: TextElement;
  type: TextType;
}

export const Text = ({ className, children, tag: Tag = 'p', type }: TextProps) => {
  return <Tag className={cn(type, className)}>{children}</Tag>;
};
