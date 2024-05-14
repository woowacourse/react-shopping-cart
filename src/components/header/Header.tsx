import { StyledHeaderContainer } from "./Header.styled";
import { HeaderButton } from "../button/HeaderButton";

const Header: React.FC<{ type: "shop" | "back" }> = ({ type }) => {
  return (
    <StyledHeaderContainer>
      <HeaderButton type={type} />
    </StyledHeaderContainer>
  );
};

export default Header;
