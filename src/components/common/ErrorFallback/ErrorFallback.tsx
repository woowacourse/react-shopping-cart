import { ErrorResponse, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import * as Styled from './ErrorFallback.style';

interface ErrorFallbackProps {
  error: Error | ErrorResponse;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  const navigate = useNavigate();
  const errorMessage = isRouteErrorResponse(error) ? error.statusText : (error as Error).message;

  return (
    <Styled.ErrorContainer>
      <Styled.ErrorTitle>⚠️ 오류가 발생했습니다.</Styled.ErrorTitle>
      <Styled.ErrorDescription>
        아래와 같은 오류가 발생했어요.
        <br />
        서둘러 복구하겠습니다. 🙇‍♂️
      </Styled.ErrorDescription>
      <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      <Styled.RefreshButton onClick={() => navigate(0)}>화면 새로고침하기</Styled.RefreshButton>
    </Styled.ErrorContainer>
  );
}
