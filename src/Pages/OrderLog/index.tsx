import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { OrderList, OrderProductItem, ProductImage } from "../../Components";
import PageTitle from "../../Components/PageTitle";
import { Order } from "../../interface";
import { RootState } from "../../store";
import { Container } from "./style";

const OrderLog = () => {
  console.log("render");
  const { orderList } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatch");
    dispatch(actions.orderList.get.request());
  }, []);

  return (
    <Container>
      <PageTitle>주문목록</PageTitle>
      {orderList
        .reduce((reversed: Order[], current) => [current, ...reversed], [])
        .map(({ id, itemList }) => (
          <OrderList key={id} id={id} showDetailLinkHref={`/order-detail?orderId=${id}`}>
            {itemList.map(({ id, name, price, imageSrc, quantity }) => (
              <OrderProductItem
                key={id}
                id={id}
                Image={<ProductImage size="7.5rem" src={imageSrc} aria-label={`${name}이미지`} />}
                name={name}
                price={price}
                quantity={quantity}
              />
            ))}
          </OrderList>
        ))}
    </Container>
  );
};

export default OrderLog;
