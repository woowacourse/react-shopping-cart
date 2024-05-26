import Text from '../common/Text/Text';
import * as S from './ErrorFallback.style';
import Button from '../common/Button/Button';
import useApiErrorState from '../../hooks/error/useApiErrorState';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const { resetApiError } = useApiErrorState();
  return (
    <S.FallbackContainer>
      <Text>{error ? error.message : '장바구니에 담은 상품이 없습니다.'}</Text>
      <Button
        onClick={() => {
          resetErrorBoundary();
          resetApiError();
        }}
      >
        다시 시도하기
      </Button>
    </S.FallbackContainer>
  );
};

export default ErrorFallback;
