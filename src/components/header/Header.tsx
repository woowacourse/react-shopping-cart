import { HeaderButton } from "../button/headerButton/HeaderButton";
import { StyledHeaderContainer } from "./Header.styled";

const Header: React.FC<{ type: "shop" | "back" }> = ({ type }) => {
  return (
    <StyledHeaderContainer>
      <HeaderButton type={type} />
    </StyledHeaderContainer>
  );
};

export default Header;
