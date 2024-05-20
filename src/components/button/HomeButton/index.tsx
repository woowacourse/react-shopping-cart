import { useNavigate } from "react-router-dom";
import * as S from "./styled";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleMoveToHomePage = () => {
    navigate("/");
  };

  return <S.StyledButton onClick={handleMoveToHomePage}>SHOP</S.StyledButton>;
};

export default HomeButton;
