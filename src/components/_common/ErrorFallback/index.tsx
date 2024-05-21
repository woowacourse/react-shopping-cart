import * as S from "./styled";

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <S.Container role="alert">
      <S.Title>오류가 발생했습니다</S.Title>
      <S.ErrorContent>{error.message}</S.ErrorContent>
    </S.Container>
  );
};

export default ErrorFallback;
