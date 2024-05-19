import Styled from "./Caption.style";

interface CaptionProps {
  asset?: () => JSX.Element;
  text: string;
}

const Caption = ({ asset, text }: CaptionProps) => {
  return (
    <Styled.CaptionText>
      {asset && asset()}
      {text}
    </Styled.CaptionText>
  );
};

export default Caption;
