import { useTheme } from "@emotion/react";
import { themeType } from "../../ThemeProvider";
import * as S from "./index.styles";

const NotFound = () => {
  const theme = useTheme() as themeType;
  return (
    <S.NotFoundContainer>
      <p>잘못들어오셨나봐요</p>
      <S.HomeButton to="/" color={theme.color.primary}>
        홈으로 돌아가기
      </S.HomeButton>
    </S.NotFoundContainer>
  );
};

export default NotFound;
