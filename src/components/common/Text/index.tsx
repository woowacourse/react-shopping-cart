import * as S from "./Text.styled";
import { TextVariant } from "./type";

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

const Text = ({ variant = "title-1", children, color = "#000", style }: TextProps) => {
  return (
    <S.Text variant={variant} color={color} style={style}>
      {children}
    </S.Text>
  );
};

export default Text;
