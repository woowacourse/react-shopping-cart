import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";
import { To, useNavigate } from "react-router-dom";

interface CustomLinkProps extends PropsWithChildren {
  disabled?: boolean;
  To: To | number;
  style?: SerializedStyles;
}

/**
 *
 * @param  style 값은 emoion CSS값 사용
 * @returns
 */
const CustomLink = ({ disabled, To, children, style }: CustomLinkProps) => {
  const navigation = useNavigate();

  const handleClick = () => {
    if (typeof To === "number") {
      navigation(To);
    } else {
      navigation(To);
    }
  };

  return (
    <button disabled={disabled || false} css={style} onClick={handleClick} role="link">
      {children}
    </button>
  );
};

export default CustomLink;
