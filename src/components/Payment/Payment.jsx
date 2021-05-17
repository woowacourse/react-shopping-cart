import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { usePayment } from "../ProvidePayment/ProvidePayment";

import { removeChecked } from "../../store/modules/cartSlice";
import { addToOrdersList } from "../../store/modules/orderSlice";
import { formatPrice } from "../../utils/utils";

import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

import * as S from "./Payment.styled";

const Payment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const payment = usePayment();

  const cart = useSelector((state) => state.cart);
  const checkedItems = Object.values(cart).filter((item) => item.checked);
  const totalPrice = checkedItems.reduce(
    (acc, { amount, price }) => acc + amount * price,
    0
  );

  const handleButtonClick = () => {
    dispatch(addToOrdersList({ items: checkedItems }));
    dispatch(removeChecked());
    payment.done();
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
