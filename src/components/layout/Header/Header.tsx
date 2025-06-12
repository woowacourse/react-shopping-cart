import * as Styled from "./Header.styles";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <Styled.Header>
      <span>{children}</span>
    </Styled.Header>
  );
}
