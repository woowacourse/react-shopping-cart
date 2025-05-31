import { SerializedStyles } from "@emotion/react";
import * as S from "./Button.styles";

interface Props {
  iconUrl?: string;
  title?: string;
  css?: SerializedStyles;
  disabled?: boolean;
  testId?: string;
  onClick: () => void;
}

const Button = ({ iconUrl, title, onClick, css, disabled, testId }: Props) => {
  return (
    <S.Button
      onClick={onClick}
      css={css}
      disabled={disabled}
      data-testid={testId}
    >
      {iconUrl && <S.ButtonIcon src={iconUrl} />}
      {title && <S.ButtonTitle>{title}</S.ButtonTitle>}
    </S.Button>
  );
};

export default Button;
