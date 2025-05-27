import { StyledHeader, StyledSpan } from "./Header.styles";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <StyledHeader>
      <StyledSpan>{children}</StyledSpan>
    </StyledHeader>
  );
}
