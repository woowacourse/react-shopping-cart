import { headerLayout } from './Header.style';

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return <header css={headerLayout}>{children}</header>;
}
