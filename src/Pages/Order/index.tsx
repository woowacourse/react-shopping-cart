import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import actions from "../../actions";
import { OrderProductItem, ProductImage } from "../../Components";

import PageTitle from "../../Components/PageTitle";
import SubmitBox from "../../Components/SubmitBox";
import { CartItem } from "../../interface";
import { Container, OrderListTitle, Section, Main, FloatingArea } from "./style";

interface LocationState {
  orders: CartItem[];
  totalPrice: number;
}

const Order = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const { orders, totalPrice } = state;

  const onClickSubmitButton = () => {
    const orderRequests = orders.map(({ id, quantity }) => ({
      cart_id: id,
      quantity,
    }));

    dispatch(actions.orderList.post.request(orderRequests));
    history.push("/orderlog");
  };

  return (
    <Container>
      <PageTitle>주문/결제</PageTitle>
      <Main>
        <OrderListTitle>{`주문 상품(${orders.length}건)`}</OrderListTitle>
        <Section>
          <ul>
            {orders.map(({ id, name, quantity, imageSrc }) => (
              <OrderProductItem
                id={id}
                Image={<ProductImage size="7.5rem" src={imageSrc} aria-label={`${name}이미지`} />}
                name={name}
                quantity={quantity}
              />
            ))}
          </ul>
        </Section>
        <FloatingArea>
          <SubmitBox
            title="결제금액"
            width="448px"
            height="318px"
            target={{ name: "총 결제금액", value: `${totalPrice.toLocaleString("ko-KR")}원` }}
            buttonName={`${totalPrice.toLocaleString("ko-KR")}원 결제하기`}
            onClickSubmitButton={onClickSubmitButton}
          />
        </FloatingArea>
      </Main>
    </Container>
  );
};

export default Order;
