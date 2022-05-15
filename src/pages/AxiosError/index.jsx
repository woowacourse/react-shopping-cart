import { useTheme } from "@emotion/react";
import React from "react";
import * as S from "./index.styles";

const AxiosError = () => {
  const theme = useTheme();
  return (
    <S.AxiosErrorContainer>
      <p>서버에러</p>
      <S.HomeButton to="/" color={theme.color.primary}>
        홈으로 돌아가기
      </S.HomeButton>
    </S.AxiosErrorContainer>
  );
};

export default AxiosError;
