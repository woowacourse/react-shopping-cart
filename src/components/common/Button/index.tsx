import {SerializedStyles} from '@emotion/react';
import * as S from './Button.styles';

interface Props {
  iconUrl?: string;
  title?: string;
  css?: SerializedStyles;
  disabled?: boolean;
  testId?: string;
  mode?: 'light' | 'dark';
  onClick: () => void;
}

const Button = ({
  iconUrl,
  title,
  css,
  mode = 'light',
  disabled,
  testId,
  onClick,
}: Props) => {
  return (
    <S.Button
      css={css}
      mode={mode}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {iconUrl && <S.ButtonIcon src={iconUrl} />}
      {title && <S.ButtonTitle>{title}</S.ButtonTitle>}
    </S.Button>
  );
};

export default Button;
