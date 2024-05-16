import * as S from './ErrorFallback.style';

interface ErrorFallbackProps {
  error?: Error;
}
//TODO : Errorcode 받아서 반환하는게 나을듯
const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return <S.FallbackContainer>{error ? `${error.message}` : '장바구니에 담은 상품이 없습니다.'}</S.FallbackContainer>;
};

export default ErrorFallback;
