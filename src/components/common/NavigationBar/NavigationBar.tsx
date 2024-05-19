import { PropsWithChildren } from 'react';
import * as Styled from './NavigationBar.style';

export default function NavigationBar({ children, ...props }: PropsWithChildren) {
  return <Styled.NavigationBar {...props}>{children}</Styled.NavigationBar>;
}
