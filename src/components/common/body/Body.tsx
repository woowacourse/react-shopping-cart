import { PropsWithChildren } from 'react';
import * as S from './Body.styles';

function Body({ children }: PropsWithChildren) {
  return <S.Container>{children}</S.Container>;
}
export default Body;
