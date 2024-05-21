import styled from "styled-components";

export type TextType = "xLarge" | "large" | "medium" | "small" | "xSmall";

interface TextBoxProps {
  asset?: () => JSX.Element;
  text: string;
  type: TextType;
  style?: React.CSSProperties;
}

const TextBox = ({ asset, text, type, style }: TextBoxProps) => {
  return (
    <CaptionText type={type} style={style}>
      {asset && asset()}
      {text}
    </CaptionText>
  );
};

export default TextBox;

const CaptionText = styled.span<{ type: TextType }>`
  display: flex;
  align-items: center;
  gap: 5px;
  ${({ theme, type }) => theme.TEXT[type]};
`;
