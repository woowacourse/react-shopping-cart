import { useErrorToast } from '@/hooks/useErrorToast';
import * as S from './ErrorToastMessage.styles';

function ErrorToastMessage() {
  const message = useErrorToast();

  if (!message) return null;

  return (
    <S.Container>
      <S.ErrorText>{message}</S.ErrorText>
    </S.Container>
  );
}

export default ErrorToastMessage;
