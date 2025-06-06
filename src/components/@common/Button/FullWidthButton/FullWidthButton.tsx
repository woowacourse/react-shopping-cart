import { css } from "@emotion/css";
import Text from "../../Text/Text";

interface FullWidthButtonProps {
  text: string;
  onClick: () => void;
  testId?: string;
}

const FullWidthButton = ({ text, onClick, testId }: FullWidthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={FullWidthButtonStyle}
      data-testid={testId}
    >
      <Text text={text}></Text>
    </button>
  );
};

export default FullWidthButton;

const FullWidthButtonStyle = css`
  width: 100%;
  padding: 16px 8px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  border-radius: 6px;
`;
