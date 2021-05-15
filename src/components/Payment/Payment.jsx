import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { selectCheckedCartItems } from "../../store/modules/cartSlice";
import { orderCartItems } from "../../store/modules/orderSlice";
import { formatPrice } from "../../utils/utils";
import { usePayment } from "../ProvidePayment/ProvidePayment";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

import * as S from "./Payment.styled";

const Payment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const payment = usePayment();

  const checkedItems = useSelector(selectCheckedCartItems);

  const totalPrice = checkedItems.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  const handleButtonClick = () => {
    dispatch(orderCartItems(checkedItems));
    history.push("/orders-list");
  };

  return !payment.isReady ? (
    <Redirect to="/cart" />
  ) : (
    <S.Payment>
      <PageTitle>주문/결제</PageTitle>
      <S.Main>
        <PaymentInfo checkedItems={checkedItems} />
        <ResultBox
          title="결제금액"
          text="총 결제금액"
          price={totalPrice}
          buttonContent={`${formatPrice(totalPrice)}원 결제하기`}
          onButtonClick={handleButtonClick}
        />
      </S.Main>
    </S.Payment>
  );
};

export default Payment;
