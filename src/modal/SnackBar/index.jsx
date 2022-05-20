import React from "react";
import * as S from "./index.styles";

const SnackBar = ({ message }) => {
  if (!message) return;
  return (
    <S.SnackBar>
      <S.SnackBarMessage>{message}</S.SnackBarMessage>
    </S.SnackBar>
  );
};

export default SnackBar;
