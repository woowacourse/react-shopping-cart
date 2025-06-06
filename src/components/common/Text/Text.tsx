import { TextStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  varient: 'title' | 'subtitle' | 'body' | 'caption';
  whiteSpace?: 'pre-line' | 'normal';
  textAlign?: 'left' | 'center' | 'right';
}

function Text({
  children,
  varient,
  whiteSpace = 'normal',
  textAlign = 'center',
}: TextProps) {
  return (
    <p css={TextStyle[varient]} style={{ whiteSpace, textAlign }}>
      {children}
    </p>
  );
}

export default Text;
