import classNames from 'classnames/bind';

import css from './Text.module.css';

const cn = classNames.bind(css);

type Children = string | number;
type Tag = 'p' | 'span';
type Type = 'h1' | 'h2' | 'b1' | 'b2';

interface TextProps {
  children: Children;
  className?: string;
  tag?: Tag;
  type: Type;
}

export const Text = ({ className, children, tag: Tag = 'p', type }: TextProps) => {
  return <Tag className={cn(type, className)}>{children}</Tag>;
};
