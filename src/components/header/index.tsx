import * as S from "./Header.styled";
import Logo from "../icons/Logo";
import PrevArrow from "../icons/PrevArrow";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleNavigate = () => navigate(-1);

  return (
    <S.Header>
      {pathname === "/order-confirm" ? <PrevArrow onClick={handleNavigate} style={{ cursor: "pointer" }} /> : <Logo />}
    </S.Header>
  );
};

export default Header;
