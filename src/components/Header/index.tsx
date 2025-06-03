import * as S from "./Header.styled";
import { useLocation, useNavigate } from "react-router";
import { HEADER_CONFIG } from "./constants";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const HeaderContent = HEADER_CONFIG[pathname] || HEADER_CONFIG["/"];

  return <S.Header>{HeaderContent(navigate)}</S.Header>;
};

export default Header;
