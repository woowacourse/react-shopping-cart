import * as Styled from './ErrorFallback.styled';

interface ErrorFallbackProps {
  error: Error;
  $height: string;
}

function ErrorFallback({ error, $height }: ErrorFallbackProps) {
  return (
    <Styled.ErrorPageContents $height={$height}>
      <Styled.ErrorPageHeader>⚠️ 오류</Styled.ErrorPageHeader>
      <Styled.ErrorPageText>오류가 발생했어요.😥</Styled.ErrorPageText>
      <Styled.ErrorPageText>
        <i>오류: {error.message}</i>
      </Styled.ErrorPageText>
    </Styled.ErrorPageContents>
  );
}

export default ErrorFallback;
