import { TextStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  varient: 'title' | 'body' | 'caption';
}

function Text({ children, varient }: TextProps) {
  return <p css={TextStyle[varient]}>{children}</p>;
}

export default Text;
