import React, { useEffect, useState } from "react";

import { useStore } from "hooks/useStore";
import { getCartList } from "reducers/cartList";

import PaymentAmount from "./PaymentAmount";
import ProductCartList from "./ProductCartList";
import {
  CartPageContainer,
  CartPageHeader,
  CartPageList,
  CartPagePayment,
} from "./styled";

function ProductCartPage() {
  const { data: cartList, dispatch } = useStore("cartList");

  const [checkList, setCheckList] = useState([]);

  const [totalPrice, totalCount] = cartList.reduce(
    (acc, { id, price, count }) => {
      if (checkList.includes(id)) {
        acc[0] += price * count;
        acc[1] += count;
      }
      return acc;
    },
    [0, 0]
  );

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    if (checkList.length === 0)
      setCheckList(cartList.map((cartItem) => cartItem.id));
  }, [cartList]);

  return (
    <CartPageContainer>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartPageList>
        <ProductCartList checkList={checkList} setCheckList={setCheckList} />
      </CartPageList>
      <CartPagePayment>
        <PaymentAmount
          position="sticky"
          totalPrice={totalPrice}
          totalCount={totalCount}
        />
      </CartPagePayment>
    </CartPageContainer>
  );
}

export default ProductCartPage;
