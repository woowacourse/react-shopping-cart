import { SerializedStyles } from "@emotion/react";
import * as S from "./Button.styles";

interface Props {
  iconUrl?: string;
  title?: string;
  css?: SerializedStyles;
  onClick: () => void;
}

const Button = ({ iconUrl, title, onClick, css }: Props) => {
  return (
    <S.Button onClick={onClick} css={css}>
      {iconUrl && <S.ButtonIcon src={iconUrl} />}
      {title && <S.ButtonTitle>{title}</S.ButtonTitle>}
    </S.Button>
  );
};

export default Button;
