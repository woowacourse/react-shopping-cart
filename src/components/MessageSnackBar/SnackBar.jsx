import React, { useEffect } from "react";
import * as S from "./SnackBar.styles";
import { useProduct } from "../../hooks/useProduct";

// eslint-disable-next-line import/prefer-default-export
export const SnackBar = () => {
  const { errorMessage, resetProductError } = useProduct();
  // TODO: 나머지 에러들도받아서 하나로 처리
  // const { errorMessage} = useCart();

  useEffect(() => {
    if (!errorMessage) return;

    const timer = () => setTimeout(resetProductError, 5000);
    timer();
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return errorMessage && <S.SnackBar type="error">{errorMessage}</S.SnackBar>;
};
