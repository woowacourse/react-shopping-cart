import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import actions from "../../actions";
import { OrderList, OrderProductItem, ProductImage } from "../../Components";
import PageTitle from "../../Components/PageTitle";
import TextWithHighlight from "../../Components/TextWithHighlight";
import { COLOR } from "../../constants/theme";
import { RootState } from "../../store";
import { Container, PaymentInfo, PaymentInfoContent, PaymentInfoTitle } from "./style";

const OrderLogDetail = ({ location }: RouteComponentProps) => {
  const { orderList } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const orderId = new URLSearchParams(location.search).get("orderId");
  const currentOrder = orderId ? orderList.find((order) => order.id === Number(orderId)) : null;

  useEffect(() => {
    if (currentOrder === undefined) {
      dispatch(actions.orderList.get.request());
    }
  }, [currentOrder]);

  return orderId !== null && currentOrder !== null ? (
    <Container>
      <PageTitle>주문내역상세</PageTitle>
      <OrderList id={Number(orderId)}>
        {currentOrder &&
          currentOrder.itemList.map(({ id, name, price, imageSrc, quantity }) => (
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
      <PaymentInfo>
        <PaymentInfoTitle>결제금액 정보</PaymentInfoTitle>
        <PaymentInfoContent>
          <TextWithHighlight fontSize="1.5rem" fontWeight="bold" color={COLOR.BLACK} highlightColor={COLOR.MAIN}>
            총 결제금액
          </TextWithHighlight>
          <TextWithHighlight fontSize="1.5rem" fontWeight="bold" color={COLOR.BLACK} highlightColor={COLOR.MAIN}>
            {currentOrder &&
              `${currentOrder.itemList
                .reduce((totalPrice, { price }) => totalPrice + price, 0)
                .toLocaleString("ko-KR")}원`}
          </TextWithHighlight>
        </PaymentInfoContent>
      </PaymentInfo>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};

export default OrderLogDetail;
