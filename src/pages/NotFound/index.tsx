import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Styled.NotFoundWrapper flexDirection="column" justifyContent="center" alignItems="center">
      <div>존재하지 않는 페이지입니다.</div>
      <button onClick={() => navigate("/")}>홈으로 이동하기</button>
    </Styled.NotFoundWrapper>
  );
};

export default NotFound;
