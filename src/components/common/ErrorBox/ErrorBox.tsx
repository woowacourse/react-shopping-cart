import { useErrorContext } from "../../../contexts/ErrorContext";

import * as S from "./ErrorBox.styles";

export default function ErrorBox() {
  const { errorMessage } = useErrorContext();

  if (!errorMessage) {
    return null;
  }

  return (
    <S.Div>
      <S.Span>{errorMessage}</S.Span>
    </S.Div>
  );
}
