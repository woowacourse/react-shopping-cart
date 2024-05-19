import { BasicButton } from '@components/common';
import { useNavigate } from 'react-router-dom';

import * as Styled from './ErrorFallback.styled';

interface ErrorFallbackProps {
  error: Error;
  $height: string;
  reload?: boolean;
}

function ErrorFallback({ error, $height, reload }: ErrorFallbackProps) {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <Styled.ErrorPageContents $height={$height}>
      <Styled.ErrorPageHeader>⚠️ 오류</Styled.ErrorPageHeader>
      <Styled.ErrorPageText>오류가 발생했어요.😥</Styled.ErrorPageText>
      <Styled.ErrorPageText>
        <i>오류: {error.message}</i>
      </Styled.ErrorPageText>
      {reload && (
        <BasicButton onClick={handleRefresh} style={{ marginTop: '16px' }}>
          새로고침
        </BasicButton>
      )}
    </Styled.ErrorPageContents>
  );
}

export default ErrorFallback;
