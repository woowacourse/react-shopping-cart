import * as S from "./NotFoundPage.styled";
import { useNavigate } from "react-router";
import Button from "../../shared/components/common/Button";
import Text from "../../shared/components/common/Text";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Information>
        <Text variant="title-1">잘못된 접근입니다.</Text>
        <Button variant="secondary" size="full" onClick={() => navigate("/")}>
          돌아가기
        </Button>
      </S.Information>
    </S.Container>
  );
};

export default NotFoundPage;
