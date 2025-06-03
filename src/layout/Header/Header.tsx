import { headerLayout } from "./Header.style";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return <header css={headerLayout}>{children}</header>;
}
