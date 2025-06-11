import { ComponentProps, PropsWithChildren } from "react";
import * as Styled from "../styles/ModalHeader.style";

interface ModalHeaderProps
  extends PropsWithChildren,
    ComponentProps<"header"> {}

function Header({ children, ...props }: ModalHeaderProps) {
  return (
    <Styled.HeaderContainer id="modal-header">
      <Styled.ModalHeader {...props} aria-labelledby="modal-title">
        <Styled.Title id="modal-title">{children}</Styled.Title>
      </Styled.ModalHeader>
    </Styled.HeaderContainer>
  );
}
export default Header;
