import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import * as S from "./Payment.styled";

import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import PaymentInfo from "./PaymentInfo/PaymentInfo";

import { formatPrice } from "../../utils/utils";
import { removeChecked } from "../../store/modules/cartSlice";

import { MESSAGE, ROUTE } from "../../constants/constant";
import { useCart } from "../../hooks/useCart";
import { addOrder } from "../../store/modules/orderSlice";

const Payment = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const { checkedItems, totalPrice } = useCart(cart);

  if (!location.state?.isAllowed) {
    // eslint-disable-next-line no-alert
    window.alert(MESSAGE.ALERT.INVALID_APPROACH);
    return <Redirect to={ROUTE.CART} />;
  }

  const handleButtonClick = () => {
    dispatch(addOrder({ cart: checkedItems }));
    console.log(checkedItems);
    dispatch(removeChecked(cart));
    history.push(ROUTE.ORDERS_LIST);
  };

  return (
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
