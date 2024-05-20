import { PropsWithChildren } from 'react';
import * as Styled from './NavigationBar.style';

export default function NavigationBar({ children }: PropsWithChildren) {
  return <Styled.NavigationBar>{children}</Styled.NavigationBar>;
}
