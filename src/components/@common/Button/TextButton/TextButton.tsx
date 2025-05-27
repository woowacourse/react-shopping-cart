import { css } from "@emotion/css";
import Text from "../../Text/Text";

interface TextButtonProps {
  text: string;
  onClick: () => void;
}

const TextButton = ({ text, onClick }: TextButtonProps) => {
  return (
    <button onClick={onClick} className={TextButtonStyle}>
      <Text text={text}></Text>
    </button>
  );
};

export default TextButton;

const TextButtonStyle = css`
  padding: 4px 8px;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  border-radius: 4px;
`;
