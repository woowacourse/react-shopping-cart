import { useEffect, useState } from "react";
import * as S from "./index.styles";

const ShoppingCartOrder = ({ products, checkedProductIds }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const totalProductsAmount = products.reduce(
      (totalAmount, currentProduct) => {
        if (checkedProductIds.includes(currentProduct.id)) {
          return totalAmount + currentProduct.price * currentProduct.quantity;
        }

        return totalAmount;
      },
      0
    );
    const totalProductsQuantity = products.reduce(
      (totalQuantity, currentProduct) => {
        if (checkedProductIds.includes(currentProduct.id)) {
          return totalQuantity + currentProduct.quantity;
        }

        return totalQuantity;
      },
      0
    );

    setTotalAmount(totalProductsAmount);
    setTotalQuantity(totalProductsQuantity);
  }, [products, checkedProductIds]);

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

export default ShoppingCartOrder;
