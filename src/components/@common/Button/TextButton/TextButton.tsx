import { css } from "@emotion/css";
import Text from "../../Text/Text";

interface TextButtonProps {
  text: string;
  onClick: () => void;
  buttonStyled?: React.CSSProperties;
  textStyled?: React.CSSProperties;
}

const TextButton = ({
  text,
  onClick,
  buttonStyled,
  textStyled,
}: TextButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={TextButtonStyle}
      style={buttonStyled}
    >
      <Text text={text} styled={textStyled}></Text>
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
