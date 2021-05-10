import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import * as S from "./Payment.styled";
import PageTitle from "../components/@mixins/PageTitle/PageTitle";
import ResultBox from "../components/@mixins/ResultBox/ResultBox";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

const Payment = () => {
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const checkedItems = Object.values(cart).filter((item) => item.checked);

  if (!location.state?.isAllowed) {
    window.alert("비정상적인 접근입니다");
    return <Redirect to="/cart" />;
  }

  return (
    <div>
      <PageTitle>주문/결제</PageTitle>
      <S.Main>
        <PaymentInfo checkedItems={checkedItems} />
        <ResultBox
          title="결제금액"
          text="총 결제금액"
          price={325600}
          buttonContent="325000원 결제하기"
        />
      </S.Main>
    </div>
  );
};

export default Payment;
