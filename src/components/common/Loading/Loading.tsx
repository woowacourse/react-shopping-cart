import { PropsWithChildren } from 'react';
import * as S from './Loading.styles';

const Loading = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <S.LoadingWrapper>
      <S.DotWrapper>
        <S.Dot delay="0s" />
        <S.Dot delay="0.1s" />
        <S.Dot delay="0.2s" />
      </S.DotWrapper>
      {children}
    </S.LoadingWrapper>
  );
};

export default Loading;
