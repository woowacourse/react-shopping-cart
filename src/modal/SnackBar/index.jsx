import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarTypeRemove } from "../../modules/products";
import * as S from "./index.styles";

const SnackBar = () => {
  const { isOpen, duration, message, isSuccess } = useSelector(
    (state) => state.snackBarState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(setSnackBarTypeRemove());
      }, duration);
    }
  }, [dispatch, duration, isOpen]);

  if (!isOpen) return;

  return (
    <S.SnackBar isSuccess={isSuccess}>
      <S.SnackBarMessage>{message}</S.SnackBarMessage>
    </S.SnackBar>
  );
};

export default SnackBar;
