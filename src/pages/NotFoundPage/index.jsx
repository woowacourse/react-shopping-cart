import { useTheme } from "@emotion/react";
import * as S from "./index.styles";

const NotFoundPage = () => {
  const theme = useTheme();
  return (
    <S.NotFoundContainer>
      <p>잘못들어오셨나봐요</p>
      <S.HomeButton to="/" color={theme.color.primary}>
        홈으로 돌아가기
      </S.HomeButton>
    </S.NotFoundContainer>
  );
};

export default NotFoundPage;
