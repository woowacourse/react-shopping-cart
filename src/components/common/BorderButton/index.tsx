import { PropsWithChildren } from "react";
import { BorderButtonContainer, SizeType } from "./style";

const BorderButton: React.FC<
  PropsWithChildren<{ onClick: () => void; size: SizeType; className?: string }>
> = ({ children, onClick, size, className }) => {
  return (
    <BorderButtonContainer className={className} onClick={onClick} size={size}>
      {children}
    </BorderButtonContainer>
  );
};

export default BorderButton;
