import { StyledHeader, StyledSpan } from "./Header.styled";

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
