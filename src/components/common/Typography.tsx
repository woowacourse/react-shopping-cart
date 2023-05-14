import * as Styled from './styles/Typography.styles';

interface TextProps {
  children: string;
  size?: string;
  weight?: string;
  color?: string;
}

export const Typography = ({ children, size, weight, color }: TextProps) => {
  return (
    <Styled.Paragraph size={size} weight={weight} color={color}>
      {children}
    </Styled.Paragraph>
  );
};

Typography.defaultProps = {
  size: '16px',
  weight: 'normal',
  color: '#333333',
};
