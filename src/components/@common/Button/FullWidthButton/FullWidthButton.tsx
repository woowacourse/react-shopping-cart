import { css, cx } from "@emotion/css";
import Text from "../../Text/Text";

interface FullWidthButtonProps {
  text: string;
  onClick: () => void;
  testId?: string;
  variant?: "default" | "dark";
}

const FullWidthButton = ({
  text,
  onClick,
  testId,
  variant = "default",
}: FullWidthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cx(baseStyle, variantStyle[variant])}
      data-testid={testId}
    >
      <Text text={text} />
    </button>
  );
};

export default FullWidthButton;

const baseStyle = css`
  width: 100%;
  padding: 16px 8px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
`;

const variantStyle = {
  default: css`
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    color: #000000;
  `,
  dark: css`
    background-color: #333333;
    border: 1px solid #333333;
    color: #ffffff;
  `,
};
