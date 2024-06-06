import { BUTTON_COLORS, HEADER_TYPES } from "../../constants";
import { ConfirmButton } from "../button";
import Header from "../header/Header";
import { StyledCartPage, StyledContentWrapper } from "./CartLayout.styled";

interface CartLayoutProps {
  headerType: keyof typeof HEADER_TYPES;
  buttonText: string;
  buttonMode: keyof typeof BUTTON_COLORS;
  children: React.ReactNode;
  onButtonClick?: () => void;
}

export const CartLayout: React.FC<CartLayoutProps> = ({
  headerType,
  buttonText,
  buttonMode,
  children,
  onButtonClick = () => {},
}) => {
  return (
    <StyledCartPage>
      <Header type={headerType} />
      <StyledContentWrapper>{children}</StyledContentWrapper>
      <ConfirmButton text={buttonText} mode={buttonMode} onClick={onButtonClick} />
    </StyledCartPage>
  );
};
