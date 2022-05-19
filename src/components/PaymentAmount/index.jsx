import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as S from "./index.styles";

const PaymentAmount = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const shoppingCartProducts = useSelector(
    (state) => state.shoppingCartProducts
  );

  useEffect(() => {
    if (shoppingCartProducts.data.length) {
      const totalProductsAmount = shoppingCartProducts.data.reduce(
        (totalAmount, currentProduct) => {
          return totalAmount + currentProduct.price * currentProduct.quantity;
        },
        0
      );
      const totalProductsQuantity = shoppingCartProducts.data.reduce(
        (totalQuantity, currentProduct) => {
          return totalQuantity + currentProduct.quantity;
        },
        0
      );

      setTotalAmount(totalProductsAmount);
      setTotalQuantity(totalProductsQuantity);
    }
  }, [shoppingCartProducts]);

  return (
    <S.PaymentAmountContainer>
      <S.PaymentAmountTitle>결제예상금액</S.PaymentAmountTitle>
      <S.PaymentAmountControlContainer>
        <S.PaymentAmountInfoContainer>
          <p>결제예상금액</p>
          <p>{totalAmount}원</p>
        </S.PaymentAmountInfoContainer>
        <S.OrderButton type="button">주문하기({totalQuantity}개)</S.OrderButton>
      </S.PaymentAmountControlContainer>
    </S.PaymentAmountContainer>
  );
};

export default PaymentAmount;
