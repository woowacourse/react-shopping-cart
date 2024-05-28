import Styled from "./Caption.style";
import { CaptionTheme } from "./Caption.type";

interface CaptionProps {
  asset?: () => JSX.Element;
  theme?: CaptionTheme;
  text: string;
}

const Caption = ({ asset, text, theme = "info" }: CaptionProps) => {
  return (
    <Styled.CaptionText $theme={theme}>
      {asset && asset()}
      {text}
    </Styled.CaptionText>
  );
};

export default Caption;
