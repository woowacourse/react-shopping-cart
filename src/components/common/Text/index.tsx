import * as S from "./Text.styled";
import { TextVariant } from "./type";

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  color?: string;
}

const Text = ({ variant = "title-1", children, color = "#000" }: TextProps) => {
  return (
    <S.Text variant={variant} color={color}>
      {children}
    </S.Text>
  );
};

export default Text;
