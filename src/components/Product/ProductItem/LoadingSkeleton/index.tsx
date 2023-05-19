import * as S from './LoadingSkeleton.styles';

const LoadingSkeleton = () => {
  return (
    <S.LoadingItemWrapper>
      <S.LoadingItemImage />
      <S.LoadingProductWrapper>
        <div>
          <S.LoadingProductName />
          <S.LoadingProductPrice />
        </div>
      </S.LoadingProductWrapper>
    </S.LoadingItemWrapper>
  );
};

export default LoadingSkeleton;
