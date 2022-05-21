import { useNavigate } from "react-router-dom";
import routes from "../../routes";
import { NotFoundContainer } from "./styles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <div>존재하지 않는 페이지입니다.</div>
      <button onClick={() => navigate(routes.home)}>홈으로 이동하기</button>
    </NotFoundContainer>
  );
};

export default NotFound;
