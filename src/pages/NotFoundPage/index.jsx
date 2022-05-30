import { useTheme } from "@emotion/react";
import * as S from "./index.styles";

const NotFoundPage = () => {
  const theme = useTheme();
  return (
    <S.NotFoundContainer>
      <p>준비중입니다...🙇🏻‍♂️</p>
      <S.HomeButton to="/" color={theme.color.primary}>
        홈으로 돌아가기
      </S.HomeButton>
    </S.NotFoundContainer>
  );
};

export default NotFoundPage;
