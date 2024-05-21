import styled from "styled-components";

export type TextType = "title" | "subTitle" | "caption";

interface TextBoxProps {
  asset?: () => JSX.Element;
  text: string;
  type: TextType;
}

const TextBox = ({ asset, text, type }: TextBoxProps) => {
  return (
    <CaptionText type={type}>
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

  ${({ theme, type }) => theme.TEXT[type]}
`;
