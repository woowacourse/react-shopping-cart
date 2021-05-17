import React, { VFC } from "react";
import { useLocation } from "react-router-dom";

import { OrderProductItem, PageTitle, ProductImage, SubmitBox } from "../../Components";
import { CartItem } from "../../types";
import { Container, OrderListTitle, Section, Main } from "./style";

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
            {order.map(({ cart_id, name, quantity, image_url }) => (
              <OrderProductItem id={cart_id} imageSrc={image_url} name={name} quantity={quantity} />
            ))}
          </ul>
        </Section>
        <SubmitBox
          title="결제금액"
          width="448px"
          height="318px"
          target={{ name: "총 결제금액", value: `${totalPrice}원` }}
          buttonName={`${totalPrice}원 결제하기`}
          onClickSubmitButton={() => {}}
        />
      </Main>
    </Container>
  );
};

export default Order;
