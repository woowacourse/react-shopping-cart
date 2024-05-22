import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/constants/route";
import * as S from "./styled";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleMoveToHomePage = () => {
    navigate(ROUTE_PATH.base);
  };

  return <S.StyledButton onClick={handleMoveToHomePage}>SHOP</S.StyledButton>;
};

export default HomeButton;
