import React from "react";
import { useLocation } from "react-router-dom";

import { OrderProductItem, PageTitle, ProductImage, SubmitBox } from "../../Components";
import { Container, OrderListTitle, Section, Main } from "./style";

import { CartItem } from "../../types";
import { toNumberWithComma } from "../../utils/format";

interface LocationState {
  order: (CartItem & {
    quantity: number;
  })[];
  totalPrice: number;
}

const Order = () => {
  const { state } = useLocation<LocationState>();
  const { order, totalPrice } = state;

  return (
    <Container>
      <PageTitle>주문/결제</PageTitle>
      <Main>
        <OrderListTitle>{`주문 상품(${order.length}건)`}</OrderListTitle>
        <Section>
          <ul>
            {order.map(({ cartId, name, quantity, imageUrl }) => (
              <OrderProductItem id={cartId} imageUrl={imageUrl} name={name} quantity={quantity} />
            ))}
          </ul>
        </Section>
        <SubmitBox
          title="결제금액"
          width="448px"
          height="318px"
          target={{ name: "총 결제금액", value: `${toNumberWithComma(totalPrice)}원` }}
          buttonName={`${toNumberWithComma(totalPrice)}원 결제하기`}
          onClickSubmitButton={() => {
            alert("결제기능 미구현입니다.");
          }}
        />
      </Main>
    </Container>
  );
};

export default Order;
