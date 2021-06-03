import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import * as S from "./Payment.styled";

import ResultBox from "../@mixins/ResultBox/ResultBox";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

import { formatPrice } from "../../utils/util";

import { MESSAGE, ROUTE } from "../../constants/constant";
import { useCart } from "../../hooks/useCart";
import { useOrder } from "../../hooks/useOrder";

const Payment = () => {
  const location = useLocation();
  const history = useHistory();

  const { addOrder } = useOrder();
  const { checkedItems, totalPrice } = useCart();

  if (!location.state?.isAllowed) {
    window.alert(MESSAGE.ALERT.INVALID_APPROACH);
    return <Redirect to={ROUTE.CART} />;
  }

  const handleButtonClick = () => {
    addOrder({ cart: checkedItems });
    history.push(ROUTE.ORDERS_LIST);
  };

  return (
    <S.Payment>
      <S.PageTitle>주문/결제</S.PageTitle>
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
