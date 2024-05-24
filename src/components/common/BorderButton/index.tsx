import { PropsWithChildren } from "react";
import { BorderButtonContainer, SizeType } from "./style";

const BorderButton: React.FC<
  PropsWithChildren<{
    onClick?: () => void;
    size: SizeType;
    bgColor?: string;
    color?: string;
    className?: string;
  }>
> = ({ children, onClick, size, bgColor, color = "#fff", className }) => {
  return (
    <BorderButtonContainer
      className={className}
      type="button"
      bgColor={bgColor}
      color={color}
      onClick={onClick}
      size={size}
    >
      {children}
    </BorderButtonContainer>
  );
};

export default BorderButton;
