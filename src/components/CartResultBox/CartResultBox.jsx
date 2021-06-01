import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectCheckedCartIds,
  selectCheckedTotalPrice,
} from "../../store/modules/cartSlice";
import { usePayment } from "../ProvidePayment/ProvidePayment";
import PATH from "../../constants/path";
import ResultBox from "../@mixins/ResultBox/ResultBox";

const CartResultBox = () => {
  const history = useHistory();
  const payment = usePayment();

  const checkedCartIds = useSelector(selectCheckedCartIds, shallowEqual);

  const totalPrice = useSelector(selectCheckedTotalPrice);

  const handleButtonClick = () => {
    payment.getReady();
    history.push(PATH.PAYMENT);
  };

  const hasCheckedItems = checkedCartIds.length > 0;

  return (
    <ResultBox
      title="결제예상금액"
      text="결제예상금액"
      price={totalPrice}
      buttonContent={`주문하기${
        hasCheckedItems ? `(${checkedCartIds.length}개)` : ""
      }`}
      disabled={!hasCheckedItems}
      onButtonClick={handleButtonClick}
    />
  );
};

export default CartResultBox;
