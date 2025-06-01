import { css } from "@emotion/css";

type TextType = "small" | "medium" | "large";

interface TextProps {
  text: string;
  type?: TextType;
  testId?: string;
  styled?: React.CSSProperties;
}
const Text = ({ text, type = "small", testId, styled }: TextProps) => {
  return (
    <p className={TextStyle(type)} data-testid={testId} style={styled}>
      {text}
    </p>
  );
};

export default Text;

const TextStyle = (type: TextType) => css`
  font-weight: ${type === "small" ? 500 : 700};
  font-size: ${type === "large" ? "24px" : type === "medium" ? "16px" : "12px"};
  color: ${type === "small" ? "#0A0D13" : "#000000"};
`;
