import { useTheme } from "@emotion/react";
import React from "react";
import * as S from "./index.styles";

const ErrorPage = () => {
  const theme = useTheme();
  return (
    <S.ErrorContainer>
      <p>서버에러</p>
      <S.HomeButton to="/" color={theme.color.primary}>
        홈으로 돌아가기
      </S.HomeButton>
    </S.ErrorContainer>
  );
};

export default ErrorPage;
