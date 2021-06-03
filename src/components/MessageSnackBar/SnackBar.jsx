import React, { useEffect } from "react";
import * as S from "./SnackBar.styles";
import { useProduct } from "../../hooks/useProduct";
import { useCart } from "../../hooks/useCart";
import { useOrder } from "../../hooks/useOrder";

const SnackBar = () => {
  const { errorMessage: productErrorMessage, resetProductError } = useProduct();
  const { errorMessage: cartErrorMessage, resetCartError } = useCart();
  const { errorMessage: orderErrorMessage, resetOrderError } = useOrder();

  useEffect(() => {
    if (!(productErrorMessage || cartErrorMessage || orderErrorMessage)) return;

    let timer = null;

    switch (true) {
      case !!productErrorMessage:
        timer = () => setTimeout(resetProductError, 5000);
        break;
      case !!cartErrorMessage:
        timer = () => setTimeout(resetCartError, 5000);
        break;
      case !!orderErrorMessage:
        timer = () => setTimeout(resetOrderError, 5000);
        break;
      default:
    }

    if (!timer) return;

    timer();

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productErrorMessage, cartErrorMessage, orderErrorMessage]);

  return (
    <>
      {(productErrorMessage || cartErrorMessage || orderErrorMessage) && (
        <S.SnackBar type="error">
          {productErrorMessage || cartErrorMessage || orderErrorMessage}
        </S.SnackBar>
      )}
    </>
  );
};

export default SnackBar;
