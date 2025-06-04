import { TextStyle } from './Text.styles';

interface TextProps {
  children: React.ReactNode;
  varient: 'title' | 'body' | 'caption';
  whiteSpace?: 'pre-line' | 'normal';
  textAlign?: 'left' | 'center' | 'right';
}

function Text({
  children,
  varient,
  whiteSpace = 'normal',
  textAlign = 'left',
}: TextProps) {
  return (
    <p css={TextStyle[varient]} style={{ whiteSpace, textAlign }}>
      {children}
    </p>
  );
}

export default Text;
