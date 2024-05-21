import Button from '../common/Button/Button';
import Text from '../common/Text/Text';
import * as S from './ErrorFallback.style';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <S.FallbackContainer>
      <Text>{error ? error.message : '장바구니에 담은 상품이 없습니다.'}</Text>
      <Button onClick={resetErrorBoundary}>다시 시도하기</Button>
    </S.FallbackContainer>
  );
};

export default ErrorFallback;
