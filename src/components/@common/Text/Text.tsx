import { TextStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  variant: 'title' | 'subTitle' | 'body' | 'caption';
}

function Text({ children, variant }: TextProps) {
  return <p css={TextStyle[variant]}>{children}</p>;
}

export default Text;
