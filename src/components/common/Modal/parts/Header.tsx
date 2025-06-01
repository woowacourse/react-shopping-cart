import { ComponentProps } from "react";
import {
  ModalHeader,
  HeaderContainer,
  Title,
} from "../styles/ModalHeader.style";

interface ModalHeaderProps extends ComponentProps<"header"> {
  children: React.ReactNode;
}

function Header({ children, ...props }: ModalHeaderProps) {
  return (
    <HeaderContainer id="modal-header">
      <ModalHeader {...props} aria-labelledby="modal-title">
        <Title id="modal-title">{children}</Title>
      </ModalHeader>
    </HeaderContainer>
  );
}
export default Header;
