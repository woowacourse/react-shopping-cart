import * as S from './LoadingFallback.style';

const LoadingFallback = () => {
  return (
    <S.FallbackContainer>
      <S.Spinner />
    </S.FallbackContainer>
  );
};

export default LoadingFallback;
