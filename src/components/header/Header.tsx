import { HEADER_TYPES } from "../../constants";
import { HeaderButton } from "../button/headerButton/HeaderButton";
import { StyledHeaderContainer } from "./Header.styled";

export interface HeaderButtonProps {
  type: (typeof HEADER_TYPES)[keyof typeof HEADER_TYPES];
}

const Header: React.FC<HeaderButtonProps> = ({ type }) => {
  return (
    <StyledHeaderContainer>
      {type !== HEADER_TYPES.NONE && <HeaderButton type={type} />}
    </StyledHeaderContainer>
  );
};

export default Header;
