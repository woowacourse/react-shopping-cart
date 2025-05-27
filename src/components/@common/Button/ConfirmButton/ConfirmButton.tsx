import { css } from "@emotion/css";
import Text from "../../Text/Text";

interface ConfirmButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ConfirmButton = ({
  text,
  onClick,
  disabled = false,
}: ConfirmButtonProps) => {
  return (
    <button
      className={ConfirmButtonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      <Text text={text} type="medium" />
    </button>
  );
};

export default ConfirmButton;

const ConfirmButtonStyle = css`
  width: 100%;
  height: 64px;
  color: white;
  background-color: #000000;
`;
