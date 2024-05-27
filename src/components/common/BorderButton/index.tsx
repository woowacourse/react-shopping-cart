import { PropsWithChildren } from "react";
import { BorderButtonContainer, SizeType } from "./style";

const BorderButton: React.FC<
  PropsWithChildren<{
    onClick?: () => void;
    size: SizeType;
    bgColor?: string;
    color?: string;
    className?: string;
    borderColor?: string;
  }>
> = ({ children, onClick, size, bgColor, color = "#fff", className, borderColor="#33333340" }) => {
  return (
    <BorderButtonContainer
      className={className}
      type="button"
      bgColor={bgColor}
      borderColor={borderColor}
      color={color}
      onClick={onClick}
      size={size}
    >
      {children}
    </BorderButtonContainer>
  );
};

export default BorderButton;
