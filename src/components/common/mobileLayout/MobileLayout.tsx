import { PropsWithChildren } from 'react';
import * as S from './MobileLayout.styles';

function MobileLayout({ children }: PropsWithChildren) {
  return (
    <S.Container>
      <S.Contents>{children}</S.Contents>
    </S.Container>
  );
}

export default MobileLayout;
