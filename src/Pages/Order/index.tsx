import React, { VFC } from "react";
import { useLocation } from "react-router-dom";
import { OrderProductItem, ProductImage } from "../../Components";

import PageTitle from "../../Components/PageTitle";
import SubmitBox from "../../Components/SubmitBox";
import { CartItem } from "../../interface";
import { Container, OrderListTitle, Section, Main } from "./style";

interface LocationState {
  order: CartItem[];
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
            {order.map(({ id, name, quantity, imageSrc }) => (
              <OrderProductItem
                id={id}
                Image={<ProductImage size="7.5rem" src={imageSrc} alt={`${name}이미지`} />}
                name={name}
                quantity={quantity}
              />
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
