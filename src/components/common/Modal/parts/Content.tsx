import { ComponentProps } from "react";
import { ModalContent } from "../styles/ModalContent.style";
interface ModalContentProps extends ComponentProps<"div"> {}

function Content({ children, ...props }: ModalContentProps) {
  return <ModalContent {...props}>{children}</ModalContent>;
}
export default Content;
