import styled from "styled-components";

export type TextType = "xLarge" | "large" | "medium" | "small" | "xSmall";

interface TextBoxProps {
  asset?: () => JSX.Element;
  text: string;
  type: TextType;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const TextBox = ({
  asset,
  text,
  type,
  style,
  disabled = false,
}: TextBoxProps) => {
  return (
    <CaptionText type={type} style={style} disabled={disabled}>
      {asset && asset()}
      {text}
    </CaptionText>
  );
};

export default TextBox;

const CaptionText = styled.span<{ disabled: boolean; type: TextType }>`
  display: flex;
  align-items: center;
  gap: 5px;
  ${({ theme, type }) => theme.TEXT[type]};
  color: ${({ theme, disabled }) => disabled && theme.COLOR["grey-2"]};
`;
