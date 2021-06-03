import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectCheckedCartItems,
  selectCheckedTotalPrice,
  clearCart,
} from "../../store/modules/cartSlice";
import { orderCartItems } from "../../store/modules/orderSlice";
import { usePayment } from "../../components/ProvidePayment/ProvidePayment";
import { formatPrice } from "../../utils/utils";
import PATH from "../../constants/path";
import PageTitle from "../../components/@mixins/PageTitle/PageTitle";
import ResultBox from "../../components/@mixins/ResultBox/ResultBox";
import PaymentList from "../../components/PaymentList/PaymentList";

import * as S from "./Payment.styled";

const Payment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const payment = usePayment();

  const checkedItems = useSelector(selectCheckedCartItems);

  const totalPrice = useSelector(selectCheckedTotalPrice);

  const handleButtonClick = async () => {
    try {
      const orderResult = await dispatch(orderCartItems(checkedItems));

      await unwrapResult(orderResult);

      dispatch(clearCart());

      history.push(PATH.ORDER);
    } catch (error) {
      console.error(error.message);

      window.alert("주문을 실패하였습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return !payment.isReady ? (
    <Redirect to={PATH.CART} />
  ) : (
    <S.Payment>
      <PageTitle>주문/결제</PageTitle>
      <S.Main>
        <PaymentList checkedItems={checkedItems} />
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
