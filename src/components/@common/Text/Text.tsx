import { css } from "@emotion/css";

type TextType = "small" | "medium" | "large";

interface TextProps {
  text: string;
  type?: TextType;
  testId?: string;
}
const Text = ({ text, type = "small", testId }: TextProps) => {
  return (
    <div className={TextStyle(type)} data-testid={testId}>
      {text}
    </div>
  );
};

export default Text;

const TextStyle = (type: TextType) => css`
  font-weight: ${type === "small" ? 500 : 700};
  font-size: ${type === "large" ? "24px" : type === "medium" ? "16px" : "12px"};
  line-height: ${type === "large"
    ? "48px"
    : type === "medium"
    ? "24px"
    : "8px"};
`;
